import React from 'react';
import { Award, BookOpen, Code, Globe, Target, Calendar, Star, Trophy } from 'lucide-react';

const Achievements: React.FC = () => {
  const achievements = [
    {
      icon: Code,
      title: 'Full-Stack Zoom Clone Development',
      description: 'Successfully built a complete video conferencing platform with real-time communication, demonstrating advanced full-stack development skills.',
      date: '2024',
      category: 'Project',
      status: 'completed',
      impact: 'Showcases modern web development capabilities for scholarship applications'
    },
    {
      icon: BookOpen,
      title: 'freeCodeCamp Responsive Web Design',
      description: 'Completed the comprehensive Responsive Web Design certification, mastering HTML, CSS, and modern layout techniques.',
      date: '2024',
      category: 'Certification',
      status: 'completed',
      impact: 'Foundation in modern web development practices'
    },
    {
      icon: Award,
      title: 'W3Schools JavaScript Certification',
      description: 'Earned certification in JavaScript programming, covering ES6+ features, DOM manipulation, and modern JavaScript concepts.',
      date: '2024',
      category: 'Certification',
      status: 'completed',
      impact: 'Advanced programming skills and modern JavaScript mastery'
    },
    {
      icon: Globe,
      title: 'School IT Excellence',
      description: 'Demonstrated exceptional performance in IT classes, serving as peer mentor for HTML/CSS fundamentals.',
      date: '2023-2024',
      category: 'Academic',
      status: 'completed',
      impact: 'Leadership and knowledge sharing in technology education'
    }
  ];

  const futureGoals = [
    {
      icon: Target,
      title: 'JASSO Scholarship Application',
      description: 'Applying for JASSO scholarship to study computer science in Japan, leveraging portfolio projects and technical skills.',
      date: '2025',
      category: 'Goal',
      status: 'in-progress'
    },
    {
      icon: Globe,
      title: 'MEXT Scholarship Preparation',
      description: 'Preparing comprehensive application for MEXT scholarship, including technical portfolio and research proposal.',
      date: '2025',
      category: 'Goal',
      status: 'in-progress'
    },
    {
      icon: BookOpen,
      title: 'JLPT N5 Certification',
      description: 'Working toward Japanese Language Proficiency Test N5 certification to prepare for studying in Japan.',
      date: '2025',
      category: 'Goal',
      status: 'in-progress'
    },
    {
      icon: Code,
      title: 'Advanced Full-Stack Portfolio',
      description: 'Expanding portfolio with additional full-stack projects featuring cloud deployment and advanced technologies.',
      date: '2025',
      category: 'Goal',
      status: 'in-progress'
    }
  ];

  const stats = [
    { label: 'Projects Completed', value: '3', icon: Code },
    { label: 'Certifications Earned', value: '2', icon: Award },
    { label: 'Hours of Learning', value: '200+', icon: BookOpen },
    { label: 'Technologies Mastered', value: '8+', icon: Star }
  ];

  const categoryColors = {
    'Project': 'bg-blue-100 text-blue-800 border-blue-200',
    'Certification': 'bg-green-100 text-green-800 border-green-200',
    'Academic': 'bg-purple-100 text-purple-800 border-purple-200',
    'Goal': 'bg-orange-100 text-orange-800 border-orange-200'
  };

  const statusColors = {
    'completed': 'bg-green-50 border-green-200',
    'in-progress': 'bg-yellow-50 border-yellow-200'
  };

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Achievements
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A record of my growth, learning milestones, and future aspirations as I work toward 
            becoming a full-stack developer and studying in Japan.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Completed Achievements */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Trophy className="h-8 w-8 text-yellow-600" />
            <h2 className="text-3xl font-bold text-gray-900">Completed Achievements</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 ${statusColors[achievement.status]} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <achievement.icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{achievement.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[achievement.category as keyof typeof categoryColors]}`}>
                        {achievement.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>{achievement.date}</span>
                      </div>
                      <span className="text-xs text-green-600 font-medium">✓ Completed</span>
                    </div>
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Impact:</strong> {achievement.impact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Goals */}
        <div className="mb-16">
          <div className="flex items-center space-x-3 mb-8">
            <Target className="h-8 w-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Future Goals & Aspirations</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {futureGoals.map((goal, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 ${statusColors[goal.status]} hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <goal.icon className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{goal.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${categoryColors[goal.category as keyof typeof categoryColors]}`}>
                        {goal.category}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{goal.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Target: {goal.date}</span>
                      </div>
                      <span className="text-xs text-orange-600 font-medium">⏳ In Progress</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Journey Timeline */}
        <div className="bg-gray-50 rounded-2xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Learning Journey</h2>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="flex-1 border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900">Started with HTML/CSS Basics</h4>
                <p className="text-gray-600 text-sm">School IT classes introduced me to web development fundamentals</p>
                <span className="text-xs text-gray-500">2023</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="flex-1 border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900">JavaScript & Dynamic Web Development</h4>
                <p className="text-gray-600 text-sm">Expanded to interactive web applications and modern JavaScript</p>
                <span className="text-xs text-gray-500">Early 2024</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
              <div className="flex-1 border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-900">React & Modern Frontend Development</h4>
                <p className="text-gray-600 text-sm">Mastered component-based architecture and state management</p>
                <span className="text-xs text-gray-500">Mid 2024</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-green-600 rounded-full"></div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">Full-Stack Development</h4>
                <p className="text-gray-600 text-sm">Built complete applications with real-time features and databases</p>
                <span className="text-xs text-gray-500">Late 2024 - Present</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready for the Next Chapter
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            With a solid foundation in full-stack development and a passion for learning, 
            I'm excited to take the next step in my journey toward studying and working in Japan's tech industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Connect With Me
            </a>
            <a
              href="/projects"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200"
            >
              View My Projects
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;