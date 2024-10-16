import React from 'react';
import { Home, Globe, AppWindow, Mail, Settings, User } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="fixed left-6 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-xl shadow-2xl rounded-full p-3 w-16 flex flex-col items-center space-y-8 z-50">
      <nav className="flex flex-col space-y-6">
        <IconButton icon={<Home size={24} />} />
        <IconButton icon={<Globe size={24} />} />
        <IconButton icon={<AppWindow size={24} />} />
        <IconButton icon={<Mail size={24} />} />
        <IconButton icon={<Settings size={24} />} />
      </nav>
      
      <div className="mt-auto mb-2">
        <IconButton icon={<User size={24} />} />
      </div>
    </div>
  );
};

const IconButton = ({ icon }) => (
  <button className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white focus:outline-none focus:text-white transition-colors duration-200">
    {icon}
  </button>
);

export default Sidebar;