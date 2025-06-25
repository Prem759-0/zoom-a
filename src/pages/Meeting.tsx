import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { usePeerConnection } from '../hooks/usePeerConnection';
import { meetingService, type Participant } from '../services/meetingService';
import { 
  Video, VideoOff, Mic, MicOff, Monitor, MessageSquare, 
  Users, Phone, Settings, Copy, Camera, Send, UserPlus,
  Volume2, VolumeX, MoreVertical, Shield, Maximize, Minimize
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: string;
  senderId: string;
  message: string;
  timestamp: Date;
  isPrivate?: boolean;
  recipientId?: string;
}

interface RemoteStream {
  peerId: string;
  stream: MediaStream;
  participantName: string;
}

const Meeting: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { user } = useAuth();
  const { socket, isConnected } = useSocket();
  const navigate = useNavigate();
  
  // Meeting state
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setChatOpen] = useState(false);
  const [isParticipantsOpen, setParticipantsOpen] = useState(false);
  const [meetingInfo, setMeetingInfo] = useState<any>(null);
  const [isHost, setIsHost] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Chat and participants
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [remoteStreams, setRemoteStreams] = useState<RemoteStream[]>([]);
  
  // WebRTC refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const localStream = useRef<MediaStream | null>(null);
  const remoteVideoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const meetingContainerRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Get user info
  const userName = user?.name || localStorage.getItem('guestName') || 'Guest';
  const userId = user?.id || `guest-${Date.now()}`;

  // Peer connection callbacks
  const handleRemoteStream = useCallback((stream: MediaStream, peerId: string) => {
    const participant = participants.find(p => p.peerId === peerId);
    const participantName = participant?.name || 'Unknown';
    
    setRemoteStreams(prev => {
      const existing = prev.find(rs => rs.peerId === peerId);
      if (existing) {
        return prev.map(rs => rs.peerId === peerId ? { ...rs, stream } : rs);
      }
      return [...prev, { peerId, stream, participantName }];
    });
  }, [participants]);

  const handlePeerDisconnected = useCallback((peerId: string) => {
    setRemoteStreams(prev => prev.filter(rs => rs.peerId !== peerId));
    showNotification(`Participant disconnected`);
  }, []);

  const handleDataReceived = useCallback((data: any, peerId: string) => {
    if (data.type === 'chat') {
      const message: ChatMessage = {
        id: data.id,
        sender: data.sender,
        senderId: data.senderId,
        message: data.message,
        timestamp: new Date(data.timestamp),
        isPrivate: data.isPrivate,
        recipientId: data.recipientId
      };
      setChatMessages(prev => [...prev, message]);
    }
  }, []);

  // Initialize peer connection
  const {
    initializePeer,
    setLocalStream: setPeerLocalStream,
    callPeer,
    connectToPeer,
    sendDataToAll,
    disconnectAll,
    updateLocalStream,
    getPeerId
  } = usePeerConnection({
    meetingId: meetingId || '',
    userId,
    onRemoteStream: handleRemoteStream,
    onPeerDisconnected: handlePeerDisconnected,
    onDataReceived: handleDataReceived
  });

  useEffect(() => {
    if (!meetingId || !/^\d{9}$/.test(meetingId)) {
      navigate('/');
      return;
    }

    initializeMeeting();
    return () => cleanup();
  }, [meetingId, userName, socket]);

  const initializeMeeting = async () => {
    try {
      // Check if meeting exists
      const meeting = await meetingService.getMeeting(meetingId!);
      if (!meeting) {
        // Create new meeting if it doesn't exist
        const newMeeting = await meetingService.createMeeting(userId, userName);
        setMeetingInfo(newMeeting);
        setIsHost(true);
      } else {
        setMeetingInfo(meeting);
        setIsHost(meeting.hostId === userId);
      }

      // Initialize peer connection
      const peerId = initializePeer();
      
      // Get user media
      await initializeLocalStream();
      
      // Join meeting via socket
      if (socket && isConnected) {
        socket.emit('join-meeting', {
          meetingId,
          participant: {
            id: userId,
            name: userName,
            isHost: isHost,
            isVideoOn: true,
            isAudioOn: true,
            peerId: peerId
          }
        });

        // Setup socket listeners
        setupSocketListeners();
      }

      showNotification(`${userName} joined the meeting`);
      
    } catch (error) {
      console.error('Error initializing meeting:', error);
      showNotification('Failed to initialize meeting');
    }
  };

  const setupSocketListeners = () => {
    if (!socket) return;

    socket.on('participant-joined', (participant: Participant) => {
      setParticipants(prev => {
        const exists = prev.find(p => p.id === participant.id);
        if (!exists) {
          showNotification(`${participant.name} joined the meeting`);
          // Connect to new participant
          if (participant.peerId) {
            setTimeout(() => {
              callPeer(participant.peerId);
              connectToPeer(participant.peerId);
            }, 1000);
          }
          return [...prev, participant];
        }
        return prev;
      });
    });

    socket.on('participant-left', (participantId: string) => {
      setParticipants(prev => {
        const participant = prev.find(p => p.id === participantId);
        if (participant) {
          showNotification(`${participant.name} left the meeting`);
        }
        return prev.filter(p => p.id !== participantId);
      });
    });

    socket.on('participant-updated', (updatedParticipant: Participant) => {
      setParticipants(prev => 
        prev.map(p => p.id === updatedParticipant.id ? updatedParticipant : p)
      );
    });

    socket.on('chat-message', (message: ChatMessage) => {
      setChatMessages(prev => [...prev, message]);
    });

    socket.on('meeting-participants', (participantsList: Participant[]) => {
      setParticipants(participantsList);
      // Connect to existing participants
      participantsList.forEach(participant => {
        if (participant.id !== userId && participant.peerId) {
          setTimeout(() => {
            callPeer(participant.peerId);
            connectToPeer(participant.peerId);
          }, 1000);
        }
      });
    });
  };

  const initializeLocalStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      // Always enable video and audio tracks when meeting starts
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) videoTrack.enabled = true;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = true;
      setIsVideoOn(true);
      setIsAudioOn(true);
      localStream.current = stream;
      setPeerLocalStream(stream);
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing media devices:', error);
      showNotification('Camera/microphone access denied');
    }
  };

  const toggleVideo = () => {
    if (localStream.current) {
      const videoTrack = localStream.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOn(videoTrack.enabled);
        
        // Update participant status
        if (socket) {
          socket.emit('update-participant', {
            meetingId,
            participantId: userId,
            updates: { isVideoOn: videoTrack.enabled }
          });
        }
        
        showNotification(`Camera turned ${videoTrack.enabled ? 'on' : 'off'}`);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream.current) {
      const audioTrack = localStream.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioOn(audioTrack.enabled);
        
        // Update participant status
        if (socket) {
          socket.emit('update-participant', {
            meetingId,
            participantId: userId,
            updates: { isAudioOn: audioTrack.enabled }
          });
        }
        
        showNotification(`Microphone ${audioTrack.enabled ? 'unmuted' : 'muted'}`);
      }
    }
  };

  const startScreenShare = async () => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      
      // Update local stream
      updateLocalStream(screenStream);
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = screenStream;
      }
      
      setIsScreenSharing(true);
      showNotification(`${userName} started screen sharing`);
      
      // Handle screen share end
      screenStream.getVideoTracks()[0].addEventListener('ended', () => {
        setIsScreenSharing(false);
        initializeLocalStream();
        showNotification(`${userName} stopped screen sharing`);
      });
    } catch (error) {
      console.error('Error starting screen share:', error);
      showNotification('Screen sharing failed');
    }
  };

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: userName,
        senderId: userId,
        message: newMessage.trim(),
        timestamp: new Date()
      };
      
      // Add to local chat
      setChatMessages(prev => [...prev, message]);
      
      // Send via socket
      if (socket) {
        socket.emit('chat-message', {
          meetingId,
          message
        });
      }
      
      // Send via peer connection
      sendDataToAll({
        type: 'chat',
        ...message
      });
      
      setNewMessage('');
    }
  };

  const showNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    setTimeout(() => {
      setNotifications(prev => prev.slice(1));
    }, 3000);
  };

  const copyMeetingLink = () => {
    const link = `${window.location.origin}/join/${meetingId}`;
    navigator.clipboard.writeText(link);
    showNotification('Meeting link copied to clipboard');
  };

  const leaveMeeting = () => {
    if (socket) {
      socket.emit('leave-meeting', {
        meetingId,
        participantId: userId
      });
    }
    cleanup();
    navigate('/dashboard');
  };

  const cleanup = () => {
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
    }
    disconnectAll();
    if (socket) {
      socket.off('participant-joined');
      socket.off('participant-left');
      socket.off('participant-updated');
      socket.off('chat-message');
      socket.off('meeting-participants');
    }
  };

  const controlButtonClass = "p-3 rounded-full transition-all duration-200 flex items-center justify-center hover:scale-105 relative";

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      meetingContainerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div ref={meetingContainerRef} className="h-screen bg-gray-900 flex flex-col">
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in max-w-sm"
          >
            {notification}
          </div>
        ))}
      </div>

      {/* Meeting Header */}
      <div className="bg-gray-800 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold">Meeting: {meetingId}</h1>
          <button
            onClick={copyMeetingLink}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
          >
            <Copy className="h-4 w-4" />
            <span className="text-sm">Copy Link</span>
          </button>
          <button
            onClick={toggleFullscreen}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors duration-200"
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            <span className="text-sm">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
          {!isConnected ? (
            <div className="flex items-center space-x-2 px-3 py-1 bg-red-600 rounded-lg">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              <span className="text-sm">Connecting...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-600 rounded-lg">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span className="text-sm">Connected</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-300">
            {participants.length} participant{participants.length !== 1 ? 's' : ''}
          </span>
          {isHost && (
            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full flex items-center space-x-1">
              <Shield className="h-3 w-3" />
              <span>Host</span>
            </span>
          )}
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 flex">
        <div className="flex-1 relative">
          {/* Video Grid */}
          <div className="h-full p-4">
            <div className={`grid gap-2 h-full ${
              remoteStreams.length === 0 ? 'grid-cols-1' : 
              remoteStreams.length === 1 ? 'grid-cols-2' : 
              remoteStreams.length <= 4 ? 'grid-cols-2 grid-rows-2' : 
              'grid-cols-3 grid-rows-2'
            }`}>
              {/* Local Video */}
              <div className={`relative bg-black rounded-lg overflow-hidden ${!isAudioOn ? 'ring-4 ring-red-500' : ''}`}>
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                {!isVideoOn && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800">
                    <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-white text-lg font-bold">{userName}</p>
                    <p className="text-gray-400">Camera is off</p>
                  </div>
                )}
                {!isAudioOn && (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 bg-opacity-80 rounded-full p-3 shadow-lg">
                    <MicOff className="h-8 w-8 text-white" />
                  </div>
                )}
                {/* Camera Toggle Floating Button */}
                <button
                  onClick={toggleVideo}
                  className={`absolute top-4 right-4 z-10 p-3 rounded-full transition-all duration-200 flex items-center justify-center shadow-lg focus:outline-none ${
                    isVideoOn ? 'bg-green-600 text-white hover:scale-110' : 'bg-red-600 text-white animate-shake'
                  }`}
                  title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </button>
                {/* User Info Overlay */}
                <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg">
                  <span className="text-sm">{userName} (You)</span>
                </div>
                {/* Status Icons */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  {!isAudioOn && (
                    <div className="bg-red-600 p-1 rounded-full">
                      <MicOff className="h-4 w-4 text-white" />
                    </div>
                  )}
                  {isScreenSharing && (
                    <div className="bg-blue-600 p-1 rounded-full">
                      <Monitor className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Remote Videos */}
              {remoteStreams.map((remoteStream, index) => (
                <div key={remoteStream.peerId} className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    ref={(el) => {
                      if (el) {
                        el.srcObject = remoteStream.stream;
                        remoteVideoRefs.current.set(remoteStream.peerId, el);
                      }
                    }}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg">
                    <span className="text-sm">{remoteStream.participantName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {(isChatOpen || isParticipantsOpen) && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            {/* Sidebar Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setChatOpen(true);
                    setParticipantsOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isChatOpen ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Chat ({chatMessages.length})
                </button>
                <button
                  onClick={() => {
                    setParticipantsOpen(true);
                    setChatOpen(false);
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    isParticipantsOpen ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Participants ({participants.length})
                </button>
              </div>
            </div>
            {/* Chat Content */}
            {isChatOpen && (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-4 overflow-y-auto">
                  {chatMessages.length === 0 ? (
                    <div className="text-center text-gray-500 mt-8">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No messages yet</p>
                      <p className="text-sm">
                        <button
                          className="text-blue-600 underline hover:text-blue-800 focus:outline-none"
                          onClick={() => chatInputRef.current?.focus()}
                          type="button"
                        >
                          Start the conversation!
                        </button>
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="flex flex-col">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-sm text-gray-900">{msg.sender}</span>
                            <span className="text-xs text-gray-500">
                              {msg.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className={`text-gray-700 p-2 rounded-lg ${
                            msg.senderId === userId ? 'bg-blue-100 ml-4' : 'bg-gray-100'
                          }`}>
                            {msg.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <input
                      ref={chatInputRef}
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type a message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Participants Content */}
            {isParticipantsOpen && (
              <div className="flex-1 p-4">
                <div className="space-y-3">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {participant.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {participant.name}
                            {participant.isHost && (
                              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                Host
                              </span>
                            )}
                            {participant.id === userId && (
                              <span className="ml-2 text-gray-500 text-sm">(You)</span>
                            )}
                          </p>
                          <div className="flex items-center space-x-2 text-sm">
                            <div className={`flex items-center space-x-1 ${participant.isVideoOn ? 'text-green-600' : 'text-red-600'}`}>
                              {participant.isVideoOn ? <Video className="h-3 w-3" /> : <VideoOff className="h-3 w-3" />}
                              <span>{participant.isVideoOn ? 'Video' : 'No Video'}</span>
                            </div>
                            <span>•</span>
                            <div className={`flex items-center space-x-1 ${participant.isAudioOn ? 'text-green-600' : 'text-red-600'}`}>
                              {participant.isAudioOn ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
                              <span>{participant.isAudioOn ? 'Audio' : 'Muted'}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {isHost && participant.id !== userId && (
                        <div className="flex space-x-1">
                          <button 
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                            title="Mute participant"
                          >
                            <MicOff className="h-4 w-4" />
                          </button>
                          <button 
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors duration-200"
                            title="More options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Meeting Controls */}
      <div className={`${isFullscreen ? 'fixed bottom-0 left-0 w-full z-50 bg-gray-800 p-4' : 'bg-gray-800 p-4'}`}>
        <div className="flex items-center justify-center space-x-4">
          {/* Video Toggle */}
          <button
            onClick={toggleVideo}
            className={`${controlButtonClass} ${
              isVideoOn ? 'bg-green-600 text-white hover:scale-110' : 'bg-red-600 text-white animate-shake'
            }`}
            title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
          >
            {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>
          {/* Audio Toggle */}
          <button
            onClick={toggleAudio}
            className={`${controlButtonClass} ${
              isAudioOn ? 'bg-green-600 text-white hover:scale-110' : 'bg-red-600 text-white animate-shake'
            }`}
            title={isAudioOn ? 'Mute microphone' : 'Unmute microphone'}
          >
            {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>
          {/* Screen Share */}
          <button
            onClick={startScreenShare}
            className={`${controlButtonClass} ${
              isScreenSharing ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'
            }`}
            title="Share screen"
          >
            <Monitor className="h-5 w-5" />
          </button>
          {/* Chat */}
          <button
            onClick={() => {
              setChatOpen(!isChatOpen);
              setParticipantsOpen(false);
            }}
            className={`${controlButtonClass} ${
              isChatOpen ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'
            }`}
            title="Toggle chat"
          >
            <MessageSquare className="h-5 w-5" />
            {chatMessages.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {chatMessages.length > 9 ? '9+' : chatMessages.length}
              </span>
            )}
          </button>
          {/* Participants */}
          <button
            onClick={() => {
              setParticipantsOpen(!isParticipantsOpen);
              setChatOpen(false);
            }}
            className={`${controlButtonClass} ${
              isParticipantsOpen ? 'bg-blue-600 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'
            }`}
            title="View participants"
          >
            <Users className="h-5 w-5" />
          </button>
          {/* Settings */}
          <button 
            className={`${controlButtonClass} bg-gray-600 text-white hover:bg-gray-500`}
            title="Settings"
          >
            <Settings className="h-5 w-5" />
          </button>
          {/* Leave Meeting */}
          <button
            onClick={leaveMeeting}
            className={`${controlButtonClass} bg-red-600 text-white hover:bg-red-700`}
            title="Leave meeting"
          >
            <Phone className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Meeting;