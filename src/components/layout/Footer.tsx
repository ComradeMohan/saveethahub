import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center text-sm">
          <span>© {new Date().getFullYear()} Saveetha Hub. Made with</span>
          <Heart className="h-4 w-4 mx-1 text-red-400 fill-current" />
          <span>for students</span>
        </p>
        <p className="text-blue-300 text-xs mt-1">
          Version 1.0.0
        </p>
      </div>
    </footer>
  );
};

export default Footer;