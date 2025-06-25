import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Video, User, Lock } from 'lucide-react';

const JoinMeeting: React.FC = () => {
  const { meetingId } = useParams<{ meetingId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [guestName, setGuestName] = useState('');
  const [meetingPassword, setMeetingPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [meetingExists, setMeetingExists] = useState(true);

  useEffect(() => {
    // Validate meeting ID format (9 digits)
    if (!meetingId || !/^\d{9}$/.test(meetingId)) {
      setMeetingExists(false);
      setError('Invalid meeting ID format. Please enter a 9-digit meeting ID.');
    }
  }, [meetingId]);

  const handleJoinMeeting = async () => {
    if (!user && !guestName.trim()) {
      setError('Please enter your name to join as guest');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate meeting validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store guest name in localStorage if not logged in
      if (!user && guestName.trim()) {
        localStorage.setItem('guestName', guestName.trim());
      }

      // Navigate to meeting room
      navigate(`/meeting/${meetingId}`);
    } catch (err) {
      setError('Failed to join meeting. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!meetingExists) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Video className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Meeting ID</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Join Meeting</h2>
          <p className="text-gray-600 mt-2">Meeting ID: {meetingId}</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Join Form */}
        <div className="space-y-6">
          {/* Guest Name (if not logged in) */}
          {!user && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>
            </div>
          )}

          {/* Meeting Password (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Password (if required)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                value={meetingPassword}
                onChange={(e) => setMeetingPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                placeholder="Enter meeting password"
              />
            </div>
          </div>

          {/* Join Button */}
          <button
            onClick={handleJoinMeeting}
            disabled={isLoading || (!user && !guestName.trim())}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? 'Joining Meeting...' : 'Join Meeting'}
          </button>

          {/* User Info */}
          {user ? (
            <div className="text-center text-sm text-gray-600">
              Joining as: <span className="font-semibold">{user.name}</span>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">
                Have an account?{' '}
                <button
                  onClick={() => navigate('/login')}
                  className="text-blue-600 font-semibold hover:text-blue-700 transition-colors duration-200"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}
        </div>

        {/* Meeting Info */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-sm font-semibold text-blue-900 mb-2">Meeting Features:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• HD Video & Audio</li>
            <li>• Real-time Chat</li>
            <li>• Screen Sharing</li>
            <li>• Participant Management</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default JoinMeeting;