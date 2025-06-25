import React from 'react';
import { ExternalLink, MapPin, GraduationCap, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Me</h1>
          <p className="text-xl text-gray-600">
            Aspiring Full-Stack Developer from Navi Mumbai
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-blue-600">PG</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Prem Gaikwad</h3>
              <p className="text-gray-600 mb-4">Commerce with IT Student</p>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center space-x-2">
                  <GraduationCap className="h-4 w-4" />
                  <span>Class 12th, DSP International College</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Kamothe, Navi Mumbai</span>
                </div>
              </div>
              <a
                href="https://www.linkedin.com/in/prem-gaikwad-64a417370/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Story */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Journey</h2>
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 mb-4">
                  I'm a 12th-grade Commerce with IT student from DSP International College in Kamothe, Navi Mumbai, 
                  with a burning passion for web development and technology. What started as basic HTML and 
                  CSS lessons in my school IT classes has evolved into a deep fascination with creating 
                  real-world applications.
                </p>
                <p className="text-gray-700 mb-4">
                  This Zoom clone represents a significant milestone in my learning journey. Building a 
                  full-stack application with real-time video conferencing, chat functionality, and user 
                  authentication has challenged me to learn technologies like React, Node.js, Socket.io, 
                  and WebRTC - far beyond what I initially thought possible for a 12th-grader.
                </p>
                <p className="text-gray-700 mb-4">
                  My ultimate goal is to work in Japan's thriving tech industry. I'm actively preparing 
                  for the JLPT N5 examination and researching scholarship opportunities like JASSO and 
                  MEXT to study computer science or information technology in Japan. The country's 
                  innovation in technology and its need for skilled developers (with over 220,000 IT 
                  worker shortage projected for 2025) makes it an ideal destination for my career.
                </p>
                <p className="text-gray-700">
                  When I'm not coding, you'll find me watching tech tutorials on YouTube (especially 
                  from channels like Web Dev Simplified), exploring new JavaScript frameworks, and 
                  learning about Japanese culture through anime and language study. Every project I 
                  build is a step closer to my dream of contributing to Japan's tech ecosystem.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills & Interests */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Technical Skills</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">HTML & CSS</span>
                  <span className="text-gray-500">Intermediate</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">JavaScript & React</span>
                  <span className="text-gray-500">Learning</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">Node.js & Express</span>
                  <span className="text-gray-500">Beginner</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">WebRTC & Real-time Apps</span>
                  <span className="text-gray-500">Exploring</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Interests & Goals</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-red-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Japan & Technology</h4>
                  <p className="text-sm text-gray-600">Fascinated by Japan's tech innovation and planning to study there</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Full-Stack Development</h4>
                  <p className="text-sm text-gray-600">Building end-to-end applications with modern technologies</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Real-time Applications</h4>
                  <p className="text-sm text-gray-600">WebRTC, Socket.io, and collaborative platforms</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Heart className="h-5 w-5 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-900">Continuous Learning</h4>
                  <p className="text-sm text-gray-600">YouTube tutorials, coding challenges, and new frameworks</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Call to Action */}
        <div className="bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Let's Connect!</h2>
          <p className="text-blue-100 mb-6">
            I'm always excited to discuss technology, learn from experienced developers, 
            or collaborate on interesting projects. Whether you're a recruiter, fellow developer, 
            or someone interested in Japan's tech scene, I'd love to hear from you!
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.linkedin.com/in/prem-gaikwad-64a417370/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors font-medium"
            >
              LinkedIn
            </a>
            <button
              onClick={() => window.location.href = '/contact'}
              className="border border-white text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Contact Me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;