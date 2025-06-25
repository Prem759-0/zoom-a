import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Video, Users, MessageSquare, Shield, ArrowRight, Play, Copy } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const Home: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState('');
  const [error, setError] = useState('');

  const handleJoinMeeting = () => {
    setError('');
    
    // Validate meeting ID (9 digits)
    if (!meetingId.trim()) {
      setError('Please enter a meeting ID');
      return;
    }
    
    if (!/^\d{9}$/.test(meetingId.trim())) {
      setError('Meeting ID must be exactly 9 digits');
      return;
    }

    navigate(`/join/${meetingId.trim()}`);
  };

  const handleStartMeeting = () => {
    if (user) {
      // Generate 9-digit meeting ID
      const newMeetingId = Math.floor(100000000 + Math.random() * 900000000).toString();
      navigate(`/meeting/${newMeetingId}`);
    } else {
      navigate('/login');
    }
  };

  const generateDemoMeetingId = () => {
    const demoId = '123456789';
    setMeetingId(demoId);
  };

  const features = [
    {
      icon: Video,
      title: 'HD Video & Audio',
      description: 'Crystal clear video calls with professional audio quality using WebRTC technology'
    },
    {
      icon: Users,
      title: 'Multiple Participants',
      description: 'Connect with multiple people in one meeting room with real-time participant management'
    },
    {
      icon: MessageSquare,
      title: 'Real-time Chat',
      description: 'Built-in messaging system for seamless communication during meetings'
    },
    {
      icon: Shield,
      title: 'Secure Meetings',
      description: 'End-to-end encryption and secure meeting access with unique 9-digit IDs'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Professional Video Conferencing
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              A Zoom-inspired video conferencing platform built from scratch by Prem Gaikwad, 
              showcasing modern full-stack development skills for scholarship applications
            </p>
            
            {/* Meeting Controls */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto mb-12">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Join a Meeting</h3>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        placeholder="Enter 9-digit Meeting ID"
                        value={meetingId}
                        onChange={(e) => {
                          setMeetingId(e.target.value);
                          setError('');
                        }}
                        className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        maxLength={9}
                      />
                      <button
                        onClick={handleJoinMeeting}
                        disabled={!meetingId.trim()}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Play className="h-4 w-4" />
                        <span>Join</span>
                      </button>
                    </div>
                    {error && (
                      <p className="text-red-300 text-sm">{error}</p>
                    )}
                    <button
                      onClick={generateDemoMeetingId}
                      className="text-blue-200 hover:text-white text-sm underline transition-colors duration-200"
                    >
                      Try demo meeting ID: 123456789
                    </button>
                  </div>
                </div>
                
                <div className="border-l border-white/20 pl-6">
                  <h3 className="text-lg font-semibold mb-4">Start a Meeting</h3>
                  <button
                    onClick={handleStartMeeting}
                    className="w-full px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <Video className="h-5 w-5" />
                    <span>{user ? 'Start Meeting' : 'Login to Start'}</span>
                  </button>
                  {user && (
                    <p className="text-blue-200 text-sm mt-2">
                      Welcome back, {user.name}!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/features"
                className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <span>Explore Features</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                About This Project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose This Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with modern technologies to deliver a seamless video conferencing experience, 
              demonstrating full-stack development capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-blue-50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Use Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How to Use
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with video conferencing in just a few simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Join or Start</h3>
              <p className="text-gray-600">
                Enter a 9-digit meeting ID to join, or click "Start Meeting" to create a new room
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Connect</h3>
              <p className="text-gray-600">
                Allow camera and microphone access, then connect with other participants
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaborate</h3>
              <p className="text-gray-600">
                Use video, audio, chat, and screen sharing to collaborate effectively
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Built by an Aspiring Developer
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              This project represents my journey as Prem Gaikwad, a 12th-grade student from Navi Mumbai, Kamothe, 
              learning full-stack development and aspiring to contribute to Japan's tech industry through 
              JASSO and MEXT scholarships.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/about"
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Learn About My Journey
              </Link>
              <Link
                to="/projects"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                View All Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testing Instructions */}
      <section className="py-12 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Test the Platform
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Quick Test Steps:</h4>
                <ol className="space-y-2 text-gray-600">
                  <li>1. Use demo meeting ID: <code className="bg-gray-100 px-2 py-1 rounded">123456789</code></li>
                  <li>2. Open in two browser tabs</li>
                  <li>3. Join as different users</li>
                  <li>4. Test video, audio, and chat</li>
                  <li>5. Check real-time notifications</li>
                </ol>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Features to Test:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Video on/off toggle</li>
                  <li>• Audio mute/unmute</li>
                  <li>• Real-time chat messaging</li>
                  <li>• Participant list updates</li>
                  <li>• Screen sharing (Chrome/Firefox)</li>
                  <li>• Meeting link sharing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;