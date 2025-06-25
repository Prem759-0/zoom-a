import React, { useState } from 'react';
import axios from 'axios';
import { Mail, MapPin, Linkedin, Send, MessageSquare, User } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setStatusMessage('');

    try {
      await axios.post('http://localhost:3001/api/contact', formData);
      setStatus('success');
      setStatusMessage('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again or contact me directly.');
      console.error('Contact form error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            I'm always excited to connect with fellow developers, recruiters, 
            and anyone interested in technology or opportunities in Japan's tech industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Let's Connect</h2>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">a70064182@gmail.com</p>
                  <p className="text-sm text-gray-500 mt-1">Best way to reach me for professional inquiries</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-gray-600">Kamothe, Navi Mumbai, Maharashtra</p>
                  <p className="text-sm text-gray-500 mt-1">Currently studying at Pandhar College</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Linkedin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Professional Network</h3>
                  <a 
                    href="https://www.linkedin.com/in/prem-gaikwad-64a417370/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    LinkedIn Profile
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Connect with me for professional opportunities</p>
                </div>
              </div>
            </div>

            {/* About My Goals */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">What I'm Looking For</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <strong>Mentorship opportunities</strong> from experienced developers</li>
                <li>• <strong>Internship or entry-level positions</strong> in web development</li>
                <li>• <strong>Guidance on studying in Japan</strong> (JASSO/MEXT scholarships)</li>
                <li>• <strong>Collaboration on projects</strong> to expand my skills</li>
                <li>• <strong>Feedback on my work</strong> and portfolio projects</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Send me a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Hi Prem! I'm reaching out because..."
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Feel free to ask about my projects, career guidance, or collaboration opportunities
                  </p>
                </div>

                {status !== 'idle' && (
                  <div className={`p-4 rounded-lg ${
                    status === 'success' ? 'bg-green-50 border border-green-200' :
                    status === 'error' ? 'bg-red-50 border border-red-200' :
                    'bg-blue-50 border border-blue-200'
                  }`}>
                    <p className={`text-sm ${
                      status === 'success' ? 'text-green-700' :
                      status === 'error' ? 'text-red-700' :
                      'text-blue-700'
                    }`}>
                      {status === 'sending' ? 'Sending your message...' : statusMessage}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  {status === 'sending' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Contact */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-4">
                Prefer to reach out directly?
              </p>
              <div className="flex justify-center space-x-4">
                <a
                  href="mailto:a70064182@gmail.com"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Send Email
                </a>
                <span className="text-gray-300">•</span>
                <a
                  href="https://www.linkedin.com/in/prem-gaikwad-64a417370/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  LinkedIn Message
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-16 text-center bg-gray-900 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Something Amazing Together?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Whether you're looking to hire a passionate junior developer, need help with a project, 
            or want to share insights about Japan's tech industry, I'm always excited to connect 
            and learn from experienced professionals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;