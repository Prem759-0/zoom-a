import React from 'react';
import { ExternalLink, Github, Monitor, Smartphone, Globe } from 'lucide-react';

const Projects: React.FC = () => {
  const projects: Array<{
    name: string;
    url: string;
    description: string;
    category: string;
    tech: string[];
    status: string;
    featured?: boolean;
    github?: string;
  }> = [
    {
      name: "spotfiy-clone",
      url: "https://sportfiy-prem.netlify.app/",
      description: "A responsive and modern full-stack sports platform featuring live scores, news, team information, and interactive features with beautiful UI design.",
      category: "Full-Stack",
      tech: ["React", "Node.js", "Responsive Design", "Modern UI", "Full-Stack"],
      status: "Latest Project",
      featured: true
    },

    {
      name: "Car Project",
      url: "https://carproject1.netlify.app/",
      description: "An automotive showcase website with interactive car gallery and responsive layouts.",
      category: "Responsive",
      tech: ["HTML", "CSS", "JavaScript", "Animation"],
      status: "Completed",
      github: "https://carproject1.netlify.app/"
    },
    {
      name: "3D Man Project",
      url: "https://3dmanproject.netlify.app/",
      description: "A desktop-focused 3D visualization project showcasing advanced CSS animations and effects.",
      category: "Desktop-Only",
      tech: ["HTML", "CSS3", "3D Transforms", "Animations"],
      status: "Completed"
    },
    {
      name: "BG Tube TV",
      url: "https://bgtubetv.netlify.app/",
      description: "A video streaming interface with custom controls and media management features.",
      category: "Desktop-Only",
      tech: ["HTML", "CSS", "JavaScript", "Video API"],
      status: "Completed"
    },
    {
      name: "Calculator",
      url: "https://calcualator1.netlify.app/",
      description: "A functional calculator application with clean design and keyboard support.",
      category: "Desktop-Only",
      tech: ["HTML", "CSS", "JavaScript", "Math Operations"],
      status: "Completed"
    },
    {
      name: "Chess Game",
      url: "https://cheesgame.netlify.app/",
      description: "An interactive chess game with move validation and game state management.",
      category: "Desktop-Only",
      tech: ["HTML", "CSS", "JavaScript", "Game Logic"],
      status: "Completed"
    },
    {
      name: "TubeTV Mobile Version",
      url: "https://tubetvmv2.netlify.app/",
      description: "A mobile-optimized video streaming interface with touch-friendly controls.",
      category: "Mobile-Only",
      tech: ["HTML", "CSS", "JavaScript", "Mobile UX"],
      status: "Completed"
    },
    {
      name: "Convex App 1",
      url: "https://tough-koala-729.convex.app/",
      description: "An AI-assisted application built with Convex for real-time data synchronization.",
      category: "Responsive",
      tech: ["React", "Convex", "Real-time DB", "AI Integration"],
      status: "AI-Assisted"
    },
    {
      name: "Convex App 2",
      url: "https://capable-rook-81.convex.app/",
      description: "Another AI-assisted project exploring modern backend-as-a-service solutions.",
      category: "Responsive",
      tech: ["React", "Convex", "TypeScript", "Modern BaaS"],
      status: "AI-Assisted"
    },
    {
      name: "Zoom Clone Project - 1",
      url: "https://zoommettingclone.netlify.app/",
      description: "A web-based video conferencing application inspired by Zoom, featuring real-time video, audio, and chat capabilities. Built for seamless online meetings.",
      category: "Full-Stack",
      tech: ["React", "Node.js", "Socket.io", "WebRTC", "TypeScript"],
      status: "Completed"
    },
    {
      name: "LeetCode Project - 1",
      url: "https://harmonious-cuchufli-839bf0.netlify.app/",
      description: "A LeetCode clone for practicing coding problems with a built-in code editor and test runner. Supports JavaScript, Python, and Java.",
      category: "Full-Stack",
      tech: ["React", "Node.js", "Monaco Editor", "TypeScript"],
      status: "Completed"
    },
    {
      name: "LeetCode Project - 2",
      url: "https://peppy-donut-238044.netlify.app/",
      description: "A LeetCode-style platform with problem lists, code editor, and real-time feedback. Features multi-language support and user-friendly UI.",
      category: "Full-Stack",
      tech: ["React", "Node.js", "Monaco Editor", "TypeScript"],
      status: "Completed"
    },
    {
      name: "Restaurant-1",
      url: "https://restaurant-langingpage-project-1.netlify.app/",
      description: "A modern restaurant landing page with menu, booking, and contact features. Clean design and responsive layout.",
      category: "Responsive",
      tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
      status: "Completed"
    },
    {
      name: "Tic Tac",
      url: "https://tic-tac-1.netlify.app/",
      description: "A simple and interactive Tic Tac Toe game built for the web. Features a clean UI and instant restart.",
      category: "Game",
      tech: ["HTML", "CSS", "JavaScript"],
      status: "Completed"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Desktop-Only':
        return Monitor;
      case 'Mobile-Only':
        return Smartphone;
      case 'Responsive':
      case 'Full-Stack':
        return Globe;
      default:
        return Globe;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Desktop-Only':
        return 'bg-blue-100 text-blue-600';
      case 'Mobile-Only':
        return 'bg-green-100 text-green-600';
      case 'Responsive':
        return 'bg-purple-100 text-purple-600';
      case 'Full-Stack':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Current Project':
        return 'bg-yellow-100 text-yellow-800';
      case 'Latest Project':
        return 'bg-purple-100 text-purple-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'AI-Assisted':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const categories = ['All', 'Full-Stack', 'Responsive', 'Desktop-Only', 'Mobile-Only'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Web Development Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A collection of projects showcasing my journey from basic HTML/CSS to 
            full-stack development with modern technologies and real-time applications.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Project */}
        {selectedCategory === 'All' && (
          <div className="mb-16 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center gap-2">
              Latest Project
              <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold animate-pulse" title="Latest Project">Latest</span>
            </h2>
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium">
                      Latest Project
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">spotfiy-clone - Full-Stack Sports Platform</h3>
                  <p className="text-blue-100 mb-6">
                    A responsive and modern full-stack sports platform featuring live scores, news, team information, 
                    and interactive features with beautiful UI design. Built with React and Node.js for optimal performance.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["React", "Node.js", "Responsive Design", "Modern UI", "Full-Stack"].map((tech) => (
                      <span key={tech} className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://sportfiy-prem.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors font-medium inline-flex items-center space-x-2"
                  >
                    <span>View Live Demo</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
                <div className="text-center">
                  <div className="bg-white bg-opacity-10 rounded-lg p-6">
                    <Globe className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Full-Stack Application</p>
                    <p className="text-blue-100">Responsive Sports Platform</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.filter(project => !project.featured).map((project, index) => {
            const CategoryIcon = getCategoryIcon(project.category);
            
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-xl hover:scale-[1.03] transition-all group animate-fade-in"
                title={project.name}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-2 rounded-lg ${getCategoryColor(project.category)}`} title={project.category}>
                      <CategoryIcon className="h-5 w-5" />
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}
                      title={project.status}
                    >
                      {project.status}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2" title={project.name}>
                    {project.name}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3" title={project.description}>
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tech.slice(0, 3).map((tech) => (
                      <span key={tech} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs" title={tech}>
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs group-hover:hidden" title="Show all tech">
                        +{project.tech.length - 3} more
                      </span>
                    )}
                    {/* Show all tech on hover */}
                    <div className="hidden group-hover:flex flex-wrap gap-1">
                      {project.tech.slice(3).map((tech) => (
                        <span key={tech} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs" title={tech}>{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {project.url !== "#current-project" ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                        title="Open Live Demo"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <button
                        onClick={() => window.location.href = '/'}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center space-x-1"
                        title="Try Current Project"
                      >
                        <span>Try Current Project</span>
                        <Monitor className="h-4 w-4" />
                      </button>
                    )}
                    
                    {/* Optional: Add GitHub button if repo available */}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-1 bg-gray-800 text-white px-3 py-2 rounded-lg hover:bg-gray-900 transition-colors text-xs font-medium"
                        title="View on GitHub"
                      >
                        <Github className="h-4 w-4" />
                        <span>GitHub</span>
                      </a>
                    )}
                    
                    <div
                      className={`px-3 py-1 rounded-lg text-xs font-medium ${getCategoryColor(project.category)}`}
                      title={project.category}
                    >
                      {project.category}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Technical Journey */}
        <div className="mt-16 bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            My Technical Journey
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Foundation</h3>
              <p className="text-sm text-gray-600">Started with HTML, CSS basics in school IT classes</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">JavaScript</h3>
              <p className="text-sm text-gray-600">Added interactivity with JavaScript and DOM manipulation</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Modern Stack</h3>
              <p className="text-sm text-gray-600">Learned React, responsive design, and modern workflows</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Full-Stack</h3>
              <p className="text-sm text-gray-600">Built complete applications with backend, database, and real-time features</p>
            </div>
          </div>
        </div>

        {/* Connect Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Interested in My Work?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            I'm always eager to learn, collaborate, and take on new challenges. 
            Whether you're a recruiter, fellow developer, or someone interested in 
            discussing technology and opportunities in Japan's tech industry.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://www.linkedin.com/in/prem-gaikwad-64a417370/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Connect on LinkedIn
            </a>
            <button
              onClick={() => window.location.href = '/contact'}
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;