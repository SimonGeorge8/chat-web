import React, { createContext, useContext, useState } from 'react';
import { Home, Search, PieChart, BellDot, Settings, MessageSquare, Send, Sun, Moon } from 'lucide-react';

// Theme context
const ThemeContext = createContext();

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Icon button component
const IconButton = ({ icon, onClick }) => {
  const { isDark } = useContext(ThemeContext);
  return (
    <button 
      onClick={onClick}
      className={`w-10 h-10 flex items-center justify-center 
        ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
        focus:outline-none transition-colors duration-200 ease-in-out`}
    >
      {icon}
    </button>
  );
};

// Sidebar component
const Sidebar = () => {
  const { isDark } = useContext(ThemeContext);
  
  return (
    <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 
      ${isDark ? 'bg-gray-800/80' : 'bg-white/80'} 
      backdrop-blur-xl shadow-lg rounded-full p-3 w-16 flex flex-col items-center space-y-8 z-50`}>
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

// Main chat component
const ChatBox = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);
  const [messages] = useState([
    { id: 1, sender: 'Alice', content: 'Hi Bob, how are you doing today?', time: '12:45' },
    { id: 2, sender: 'Bob', content: "Hello Alice! I'm doing great, thanks for asking. How about you?", time: '12:46' },
    { id: 3, sender: 'Alice', content: "I'm good too! Just working on some new designs.", time: '12:47' },
    { id: 4, sender: 'Bob', content: "That sounds interesting! Can't wait to see what you come up with.", time: '12:48' },
  ]);

  return (
    <div className={`relative min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-8`}>
      <Sidebar />

      <div className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} 
        backdrop-blur-xl rounded-3xl w-full max-w-6xl p-6 
        ${isDark ? 'text-white' : 'text-gray-900'} shadow-2xl`}>
        
        {/* Theme Toggle */}
        <div className="flex justify-end mb-4">
          <IconButton 
            icon={isDark ? <Sun size={20} /> : <Moon size={20} />}
            onClick={() => setIsDark(!isDark)}
          />
        </div>

        <div className="flex space-x-6">
          {/* Main Chat Area */}
          <div className={`flex-grow ${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} rounded-2xl p-6`}>
            <h2 className="text-2xl font-semibold mb-4">Messages</h2>
            <div className="space-y-6 mb-4 h-[calc(100vh-300px)] overflow-y-auto">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'Bob' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs ${
                    msg.sender === 'Bob' 
                      ? isDark ? 'bg-blue-500/80' : 'bg-blue-500/90' 
                      : isDark ? 'bg-gray-700/80' : 'bg-gray-200/80'
                  } rounded-2xl p-4 shadow-lg backdrop-blur-sm`}>
                    <p className="font-semibold text-sm mb-1">{msg.sender}</p>
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                    <p className={`text-xs ${isDark ? 'opacity-50' : 'opacity-60'} mt-2 text-right`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={`flex items-center ${isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'} rounded-full p-2`}>
              <input
                type="text"
                placeholder="Type a message..."
                className={`flex-grow bg-transparent outline-none px-4 text-sm
                  ${isDark ? 'placeholder-white/40' : 'placeholder-gray-500'}`}
              />
              <button className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-64 space-y-4">
            <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} rounded-2xl p-4`}>
              <h3 className="font-semibold mb-2">Online Friends</h3>
            </div>
            <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} rounded-2xl p-4`}>
              <h3 className="font-semibold mb-2">Recent Chats</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;