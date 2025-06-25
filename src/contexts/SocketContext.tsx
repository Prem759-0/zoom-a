import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false
});

export const useSocket = () => {
  return useContext(SocketContext);
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
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

    const backendUrl = getBackendUrl();
    console.log('Connecting to backend:', backendUrl);

    // Create socket connection with enhanced configuration
    const socketConnection = io(backendUrl, {
      transports: ['polling', 'websocket'], // Try polling first, then websocket
      timeout: 20000,
      forceNew: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      maxReconnectionAttempts: 5
    });

    socketConnection.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    socketConnection.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    socketConnection.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setIsConnected(false);
    });

    socketConnection.on('reconnect', (attemptNumber) => {
      console.log('Reconnected to server after', attemptNumber, 'attempts');
      setIsConnected(true);
    });

    socketConnection.on('reconnect_error', (error) => {
      console.error('Reconnection error:', error);
    });

    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const value: SocketContextType = {
    socket,
    isConnected
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};