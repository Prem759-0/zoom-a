const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);

// Enhanced CORS configuration for webcontainer
const corsOptions = {
  origin: 'http://localhost:5173', // Allow Vite frontend
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
};

const io = socketIo(server, {
  cors: corsOptions,
  allowEIO3: true,
  transports: ['polling', 'websocket'],
  pingTimeout: 60000,
  pingInterval: 25000
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// In-memory storage (replace with MongoDB in production)
const meetings = new Map();
const participants = new Map(); // meetingId -> [participants]
const chatHistory = new Map(); // meetingId -> [messages]

// API Routes
app.get('/api/meetings/:meetingId', (req, res) => {
  const { meetingId } = req.params;
  const meeting = meetings.get(meetingId);
  
  if (!meeting) {
    return res.status(404).json({ error: 'Meeting not found' });
  }
  
  res.json(meeting);
});

app.post('/api/meetings', (req, res) => {
  const { hostId, hostName, title } = req.body;
  
  // Generate 9-digit meeting ID
  const meetingId = Math.floor(100000000 + Math.random() * 900000000).toString();
  
  const meeting = {
    id: meetingId,
    title: title || `${hostName}'s Meeting`,
    hostId,
    hostName,
    participants: [],
    isActive: true,
    createdAt: new Date(),
    password: null
  };
  
  meetings.set(meetingId, meeting);
  participants.set(meetingId, []);
  chatHistory.set(meetingId, []);
  
  res.json(meeting);
});

app.post('/api/meetings/:meetingId/join', (req, res) => {
  const { meetingId } = req.params;
  const participant = req.body;
  
  const meeting = meetings.get(meetingId);
  if (!meeting) {
    return res.status(404).json({ error: 'Meeting not found' });
  }
  
  const meetingParticipants = participants.get(meetingId) || [];
  const existingParticipant = meetingParticipants.find(p => p.id === participant.id);
  
  if (!existingParticipant) {
    const newParticipant = {
      ...participant,
      joinedAt: new Date()
    };
    meetingParticipants.push(newParticipant);
    participants.set(meetingId, meetingParticipants);
  }
  
  res.json({ success: true });
});

app.post('/api/meetings/:meetingId/leave', (req, res) => {
  const { meetingId } = req.params;
  const { participantId } = req.body;
  
  const meetingParticipants = participants.get(meetingId) || [];
  const updatedParticipants = meetingParticipants.filter(p => p.id !== participantId);
  participants.set(meetingId, updatedParticipants);
  
  res.json({ success: true });
});

app.get('/api/meetings/:meetingId/participants', (req, res) => {
  const { meetingId } = req.params;
  const meetingParticipants = participants.get(meetingId) || [];
  res.json(meetingParticipants);
});

app.patch('/api/meetings/:meetingId/participants/:participantId', (req, res) => {
  const { meetingId, participantId } = req.params;
  const updates = req.body;
  
  const meetingParticipants = participants.get(meetingId) || [];
  const participantIndex = meetingParticipants.findIndex(p => p.id === participantId);
  
  if (participantIndex !== -1) {
    meetingParticipants[participantIndex] = {
      ...meetingParticipants[participantIndex],
      ...updates
    };
    participants.set(meetingId, meetingParticipants);
  }
  
  res.json({ success: true });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-meeting', ({ meetingId, participant }) => {
    console.log(`User ${participant.name} joining meeting ${meetingId}`);
    socket.join(meetingId);
    
    // Add participant to meeting
    const meetingParticipants = participants.get(meetingId) || [];
    const existingParticipant = meetingParticipants.find(p => p.id === participant.id);
    
    if (!existingParticipant) {
      const newParticipant = {
        ...participant,
        socketId: socket.id,
        joinedAt: new Date()
      };
      meetingParticipants.push(newParticipant);
      participants.set(meetingId, meetingParticipants);
      
      // Notify others about new participant
      socket.to(meetingId).emit('participant-joined', newParticipant);
      console.log(`Notified others about ${participant.name} joining`);
    }
    
    // Send current participants list to the new user
    socket.emit('meeting-participants', meetingParticipants);
    
    // Send chat history
    const messages = chatHistory.get(meetingId) || [];
    socket.emit('chat-history', messages);
  });

  socket.on('leave-meeting', ({ meetingId, participantId }) => {
    console.log(`User ${participantId} leaving meeting ${meetingId}`);
    socket.leave(meetingId);
    
    // Remove participant from meeting
    const meetingParticipants = participants.get(meetingId) || [];
    const updatedParticipants = meetingParticipants.filter(p => p.id !== participantId);
    participants.set(meetingId, updatedParticipants);
    
    // Notify others about participant leaving
    socket.to(meetingId).emit('participant-left', participantId);
  });

  socket.on('update-participant', ({ meetingId, participantId, updates }) => {
    const meetingParticipants = participants.get(meetingId) || [];
    const participantIndex = meetingParticipants.findIndex(p => p.id === participantId);
    
    if (participantIndex !== -1) {
      meetingParticipants[participantIndex] = {
        ...meetingParticipants[participantIndex],
        ...updates
      };
      participants.set(meetingId, meetingParticipants);
      
      // Notify all participants about the update
      io.to(meetingId).emit('participant-updated', meetingParticipants[participantIndex]);
    }
  });

  socket.on('chat-message', ({ meetingId, message }) => {
    console.log(`Chat message in meeting ${meetingId}:`, message);
    // Store message in chat history
    const messages = chatHistory.get(meetingId) || [];
    messages.push(message);
    chatHistory.set(meetingId, messages);
    
    // Broadcast message to all participants in the meeting
    socket.to(meetingId).emit('chat-message', message);
  });

  socket.on('offer', ({ meetingId, offer, targetPeerId }) => {
    socket.to(meetingId).emit('offer', { offer, senderPeerId: socket.id });
  });

  socket.on('answer', ({ meetingId, answer, targetPeerId }) => {
    socket.to(meetingId).emit('answer', { answer, senderPeerId: socket.id });
  });

  socket.on('ice-candidate', ({ meetingId, candidate, targetPeerId }) => {
    socket.to(meetingId).emit('ice-candidate', { candidate, senderPeerId: socket.id });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    
    // Remove participant from all meetings they were in
    for (const [meetingId, meetingParticipants] of participants.entries()) {
      const participantIndex = meetingParticipants.findIndex(p => p.socketId === socket.id);
      if (participantIndex !== -1) {
        const participant = meetingParticipants[participantIndex];
        meetingParticipants.splice(participantIndex, 1);
        participants.set(meetingId, meetingParticipants);
        
        // Notify others about participant leaving
        socket.to(meetingId).emit('participant-left', participant.id);
      }
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});