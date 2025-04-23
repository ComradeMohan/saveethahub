import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold mb-4 md:mb-0 hover:text-teal-300 transition-colors">
            <BookOpen className="h-8 w-8" />
            <span>SAVEETHA HUB - LABS</span>
          </Link>
          
          <div className="w-full md:w-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search for lab questions..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-blue-800 text-white placeholder-blue-300 border border-blue-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-blue-300" />
            </div>
            
            <Link to="/labs/my-labs" className="flex items-center space-x-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 rounded-lg transition-colors">
              <User className="h-5 w-5" />
              <span>MY LABS</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;