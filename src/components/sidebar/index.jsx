import React from 'react';
import { Home, Search, PieChart, BellDot, Settings } from 'lucide-react';
import ThemeProvider from '../theme';

const Sidebar = () => {
  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-xl shadow-lg rounded-full p-3 w-16 flex flex-col items-center space-y-8 z-50">
      <nav className="flex flex-col space-y-8">
        <IconButton icon={<Home size={20} />} />
        <IconButton icon={<Search size={20} />} />
        <IconButton icon={<PieChart size={20} />} />
        <IconButton icon={<BellDot size={20} />} />
        <IconButton icon={<Settings size={20} />} />
      </nav>
    </div>
  );
};

const IconButton = ({ icon }) => (
  <button className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white focus:outline-none transition-colors duration-200 ease-in-out">
    {icon}
  </button>
);

export default Sidebar;