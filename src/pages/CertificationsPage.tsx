import React from 'react';
import { Award, Clock, Users, Star } from 'lucide-react';

const CertificationsPage = () => {
  const certifications = [
    {
      title: 'Web Development Fundamentals',
      provider: 'Tech Academy',
      duration: '3 months',
      enrolled: '1.2k students',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
      link: 'https://www.techacademy.com/web-development-fundamentals' // Add your enrollment link here
    },
    {
      title: 'Data Science Essentials',
      provider: 'Data Institute',
      duration: '4 months',
      enrolled: '950 students',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600',
      link: 'https://www.datainstitute.com/data-science-essentials' // Add your enrollment link here
    },
    {
      title: 'Digital Marketing',
      provider: 'Marketing Pro',
      duration: '2 months',
      enrolled: '2.1k students',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600',
      link: 'https://www.marketingpro.com/digital-marketing' // Add your enrollment link here
    },
    {
      title: 'UI/UX Design',
      provider: 'Design School',
      duration: '3 months',
      enrolled: '1.5k students',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
      link: 'https://www.designschool.com/ui-ux-design' // Add your enrollment link here
    }
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4">Free Certifications</h1>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Earn industry-recognized certifications to boost your career prospects
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {certifications.map((cert, index) => (
          <div key={index} className="glass-card rounded-xl overflow-hidden group">
            <div className="h-48 overflow-hidden">
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-white mb-2">{cert.title}</h2>
              <p className="text-teal-400 mb-4">{cert.provider}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-white/70">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{cert.duration}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{cert.enrolled}</span>
                </div>
                <div className="flex items-center text-white/70">
                  <Star className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>{cert.rating}</span>
                </div>
              </div>

              {/* Wrap the button in an anchor tag */}
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className="w-full">
                <button className="w-full py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors">
                  Enroll Now
                </button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsPage;