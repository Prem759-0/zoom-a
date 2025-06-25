import React from 'react';
import { Video, Users, MessageSquare, Share2, Mic, MicOff, VideoOff, Settings, Shield, Download, Camera, Monitor } from 'lucide-react';

const Features: React.FC = () => {
  const coreFeatures = [
    {
      icon: Video,
      title: 'HD Video Conferencing',
      description: 'Crystal clear peer-to-peer video calls using WebRTC technology',
      details: [
        'Real-time video streams with adaptive quality',
        'Support for multiple video formats',
        'Automatic bandwidth optimization',
        'Video on/off toggle controls'
      ]
    },
    {
      icon: Users,
      title: 'User Authentication',
      description: 'Secure user accounts with MongoDB and JWT token management',
      details: [
        'Email and password registration',
        'Secure password hashing with bcrypt',
        'JWT-based session management',
        'User profile management'
      ]
    },
    {
      icon: MessageSquare,
      title: 'Real-time Chat',
      description: 'Instant messaging during meetings powered by Socket.IO',
      details: [
        'Public chat for all participants',
        'Private messaging capabilities',
        'Message history during sessions',
        'Emoji and text formatting support'
      ]
    },
    {
      icon: Share2,
      title: 'Meeting Management',
      description: 'Create and join meetings with unique IDs and shareable links',
      details: [
        'Generate unique meeting IDs',
        'Shareable meeting links',
        'Meeting scheduling system',
        'Join via ID or direct link'
      ]
    },
    {
      icon: Monitor,
      title: 'Screen Sharing',
      description: 'Share your screen or specific applications with participants',
      details: [
        'Full screen sharing capability',
        'Application window sharing',
        'High-quality screen capture',
        'Easy start/stop controls'
      ]
    },
    {
      icon: Settings,
      title: 'Meeting Controls',
      description: 'Comprehensive meeting management with host and participant controls',
      details: [
        'Mute/unmute audio controls',
        'Video on/off toggles',
        'Participant management',
        'Meeting lock/unlock options'
      ]
    },
    {
      icon: Download,
      title: 'Local Recording',
      description: 'Record meetings locally using MediaRecorder API',
      details: [
        'MP4/WebM format support',
        'Download recordings instantly',
        'Audio and video capture',
        'No cloud storage required'
      ]
    },
    {
      icon: Shield,
      title: 'Security Features',
      description: 'End-to-end encryption and secure meeting access',
      details: [
        'WebRTC encryption protocols',
        'Secure meeting passwords',
        'User authentication required',
        'Data privacy protection'
      ]
    }
  ];

  const technicalFeatures = [
    {
      icon: Camera,
      title: 'Virtual Backgrounds',
      description: 'Apply custom backgrounds using canvas manipulation',
      tech: 'WebRTC + Canvas API'
    },
    {
      icon: Mic,
      title: 'Audio Processing',
      description: 'Advanced audio controls with noise suppression',
      tech: 'Web Audio API'
    },
    {
      icon: Users,
      title: 'Participant Management',
      description: 'Real-time participant status and controls',
      tech: 'Socket.IO + React State'
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Platform Features
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive video conferencing solution built with modern web technologies, 
            showcasing advanced full-stack development capabilities.
          </p>
        </div>

        {/* Core Features Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Core Functionality
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300 group"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-500 flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Advanced Technical Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {technicalFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 mb-3">
                  {feature.description}
                </p>
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {feature.tech}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>React.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>React Router</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Backend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Node.js</li>
                <li>Express.js</li>
                <li>MongoDB</li>
                <li>JWT Authentication</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Real-time</h3>
              <ul className="space-y-2 text-gray-600">
                <li>WebRTC</li>
                <li>Socket.IO</li>
                <li>Simple-Peer</li>
                <li>MediaRecorder API</li>
              </ul>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Deployment</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Vercel (Frontend)</li>
                <li>Railway (Backend)</li>
                <li>MongoDB Atlas</li>
                <li>GitHub Actions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Experience the Platform
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Ready to see these features in action? Join a demo meeting or explore the full codebase on GitHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Try Demo Meeting
            </a>
            <a
              href="/projects"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              View Source Code
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;