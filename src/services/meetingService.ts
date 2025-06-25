import axios from 'axios';

// Determine the backend URL dynamically
const getBackendUrl = () => {
  // Check for environment variable first
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  
  // For webcontainer environment, construct the URL properly
  const currentUrl = window.location.href;
  if (currentUrl.includes('webcontainer-api.io')) {
    // Extract the base URL and replace port
    const url = new URL(currentUrl);
    const hostname = url.hostname;
    const protocol = url.protocol;
    
    // Replace the port in the hostname (5173 -> 3001)
    const backendHostname = hostname.replace(/5173/, '3001');
    return `${protocol}//${backendHostname}`;
  }
  
  // Fallback to localhost for local development
  return 'http://localhost:3001';
};

const API_BASE_URL = `${getBackendUrl()}/api`;

export interface Meeting {
  id: string;
  title: string;
  hostId: string;
  hostName: string;
  participants: string[];
  isActive: boolean;
  createdAt: Date;
  password?: string;
}

export interface Participant {
  id: string;
  name: string;
  isHost: boolean;
  isVideoOn: boolean;
  isAudioOn: boolean;
  peerId: string;
  joinedAt: Date;
}

class MeetingService {
  // Create a new meeting
  async createMeeting(hostId: string, hostName: string, title?: string): Promise<Meeting> {
    try {
      const response = await axios.post(`${API_BASE_URL}/meetings`, {
        hostId,
        hostName,
        title: title || `${hostName}'s Meeting`
      });
      return response.data;
    } catch (error) {
      console.error('Error creating meeting:', error);
      throw new Error('Failed to create meeting');
    }
  }

  // Get meeting by ID
  async getMeeting(meetingId: string): Promise<Meeting | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/meetings/${meetingId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting meeting:', error);
      return null;
    }
  }

  // Join a meeting
  async joinMeeting(meetingId: string, participant: Omit<Participant, 'joinedAt'>): Promise<boolean> {
    try {
      const response = await axios.post(`${API_BASE_URL}/meetings/${meetingId}/join`, participant);
      return response.data.success;
    } catch (error) {
      console.error('Error joining meeting:', error);
      return false;
    }
  }

  // Leave a meeting
  async leaveMeeting(meetingId: string, participantId: string): Promise<boolean> {
    try {
      const response = await axios.post(`${API_BASE_URL}/meetings/${meetingId}/leave`, {
        participantId
      });
      return response.data.success;
    } catch (error) {
      console.error('Error leaving meeting:', error);
      return false;
    }
  }

  // Get meeting participants
  async getMeetingParticipants(meetingId: string): Promise<Participant[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/meetings/${meetingId}/participants`);
      return response.data;
    } catch (error) {
      console.error('Error getting participants:', error);
      return [];
    }
  }

  // Update participant status
  async updateParticipantStatus(
    meetingId: string, 
    participantId: string, 
    updates: Partial<Pick<Participant, 'isVideoOn' | 'isAudioOn'>>
  ): Promise<boolean> {
    try {
      const response = await axios.patch(`${API_BASE_URL}/meetings/${meetingId}/participants/${participantId}`, updates);
      return response.data.success;
    } catch (error) {
      console.error('Error updating participant status:', error);
      return false;
    }
  }
}

export const meetingService = new MeetingService();