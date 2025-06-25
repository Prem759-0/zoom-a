import { useRef, useCallback, useEffect } from 'react';
import Peer, { DataConnection, MediaConnection } from 'peerjs';

interface UsePeerConnectionProps {
  meetingId: string;
  userId: string;
  onRemoteStream: (stream: MediaStream, peerId: string) => void;
  onPeerDisconnected: (peerId: string) => void;
  onDataReceived: (data: any, peerId: string) => void;
}

export const usePeerConnection = ({
  meetingId,
  userId,
  onRemoteStream,
  onPeerDisconnected,
  onDataReceived
}: UsePeerConnectionProps) => {
  const peer = useRef<Peer | null>(null);
  const connections = useRef<Map<string, MediaConnection>>(new Map());
  const dataConnections = useRef<Map<string, DataConnection>>(new Map());
  const localStream = useRef<MediaStream | null>(null);

  // Initialize peer
  const initializePeer = useCallback(() => {
    const peerId = `${meetingId}-${userId}-${Date.now()}`;
    peer.current = new Peer(peerId);

    peer.current.on('open', (id) => {
      console.log('Peer connected with ID:', id);
    });

    peer.current.on('call', (call) => {
      if (localStream.current) {
        call.answer(localStream.current);
        call.on('stream', (remoteStream) => {
          onRemoteStream(remoteStream, call.peer);
        });
        connections.current.set(call.peer, call);
      }
    });

    peer.current.on('connection', (conn) => {
      conn.on('data', (data) => {
        onDataReceived(data, conn.peer);
      });
      dataConnections.current.set(conn.peer, conn);
    });

    peer.current.on('error', (error) => {
      console.error('Peer error:', error);
    });

    return peer.current.id;
  }, [meetingId, userId, onRemoteStream, onDataReceived]);

  // Set local stream
  const setLocalStream = useCallback((stream: MediaStream) => {
    localStream.current = stream;
  }, []);

  // Call another peer
  const callPeer = useCallback((peerId: string) => {
    if (peer.current && localStream.current) {
      const call = peer.current.call(peerId, localStream.current);
      call.on('stream', (remoteStream) => {
        onRemoteStream(remoteStream, peerId);
      });
      call.on('close', () => {
        onPeerDisconnected(peerId);
        connections.current.delete(peerId);
      });
      connections.current.set(peerId, call);
    }
  }, [onRemoteStream, onPeerDisconnected]);

  // Connect for data exchange
  const connectToPeer = useCallback((peerId: string) => {
    if (peer.current) {
      const conn = peer.current.connect(peerId);
      conn.on('open', () => {
        dataConnections.current.set(peerId, conn);
      });
      conn.on('data', (data) => {
        onDataReceived(data, peerId);
      });
    }
  }, [onDataReceived]);

  // Send data to all peers
  const sendDataToAll = useCallback((data: any) => {
    dataConnections.current.forEach((conn) => {
      if (conn.open) {
        conn.send(data);
      }
    });
  }, []);

  // Send data to specific peer
  const sendDataToPeer = useCallback((peerId: string, data: any) => {
    const conn = dataConnections.current.get(peerId);
    if (conn && conn.open) {
      conn.send(data);
    }
  }, []);

  // Disconnect from all peers
  const disconnectAll = useCallback(() => {
    connections.current.forEach((call) => {
      call.close();
    });
    dataConnections.current.forEach((conn) => {
      conn.close();
    });
    connections.current.clear();
    dataConnections.current.clear();
    
    if (peer.current) {
      peer.current.destroy();
    }
  }, []);

  // Update local stream for all connections
  const updateLocalStream = useCallback((newStream: MediaStream) => {
    localStream.current = newStream;
    connections.current.forEach((call) => {
      // Replace tracks in existing calls
      const videoTrack = newStream.getVideoTracks()[0];
      const audioTrack = newStream.getAudioTracks()[0];
      
      if (call.peerConnection) {
        const senders = call.peerConnection.getSenders();
        senders.forEach((sender) => {
          if (sender.track) {
            if (sender.track.kind === 'video' && videoTrack) {
              sender.replaceTrack(videoTrack);
            } else if (sender.track.kind === 'audio' && audioTrack) {
              sender.replaceTrack(audioTrack);
            }
          }
        });
      }
    });
  }, []);

  return {
    initializePeer,
    setLocalStream,
    callPeer,
    connectToPeer,
    sendDataToAll,
    sendDataToPeer,
    disconnectAll,
    updateLocalStream,
    getPeerId: () => peer.current?.id || null
  };
};