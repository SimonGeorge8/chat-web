import React, { createContext, useContext, useState } from 'react';
import { Home, Search, PieChart, BellDot, Settings, MessageSquare, Send, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { doSignOut } from '../../firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/firestore';

const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const Notification = ({ onClose, message = "You have an unread message" }) => {
  const { isDark } = useTheme();
  return (
    <div role="alert" 
      className={`fixed top-4 right-4 z-50 flex items-center gap-4 p-4 rounded-lg shadow-lg
        ${isDark ? 'bg-black/30 backdrop-blur-xl' : 'bg-white/90'} text-white`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        className="h-6 w-6 shrink-0 stroke-blue-400"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <h3 className="font-bold">New message!</h3>
        <div className="text-xs opacity-75">{message}</div>
      </div>
      <button
        onClick={onClose}
        className="ml-4 px-2 py-1 rounded-lg text-sm font-medium
          bg-white/10 hover:bg-white/20 transition-colors"
      >
        X
      </button>
    </div>
  );
};

const IconButton = ({ icon, onClick, badge }) => {
  const { isDark } = useTheme();
  return (
    <button 
      onClick={onClick}
      className={`relative w-10 h-10 flex items-center justify-center 
        ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
        focus:outline-none transition-colors duration-200 ease-in-out`}
    >
      {icon}
      {badge && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};

const Sidebar = ({ onNotificationClick, notificationCount }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  return (
    <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 
      ${isDark ? 'bg-black/30 backdrop-blur-xl' : 'bg-white/90'} 
      shadow-lg rounded-2xl p-3 w-16 flex flex-col items-center space-y-8 z-50`}>
      <nav className="flex flex-col space-y-8">
        <IconButton icon={<Home size={20} />} />
        <IconButton icon={<Search size={20} />} />
        <IconButton 
          icon={<BellDot size={20} />} 
          onClick={onNotificationClick}
          badge={notificationCount > 0 ? notificationCount : null}
        />
        <IconButton icon={<Settings size={20} />} />
        <IconButton 
          icon={<LogOut size={20} />}
          onClick={() => { doSignOut().then(() => { navigate('/login') }) }}
        />
      </nav>
    </div>
  );
};

const MessageList = ({ messages }) => {
  const { isDark } = useTheme();
  return (
    <div className="space-y-6 mb-4 h-[calc(100vh-400px)] overflow-y-auto px-4">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.sender === 'Bob' ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs ${
            msg.sender === 'Bob' 
              ? 'bg-blue-500/80' 
              : isDark ? 'bg-white/10' : 'bg-gray-200/80'
          } rounded-2xl p-4 shadow-lg backdrop-blur-sm`}>
            <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>{msg.sender}</p>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>{msg.content}</p>
            <p className="text-xs opacity-50 mt-2 text-right">{msg.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const MessageInput = () => {
  const { isDark } = useTheme();
  return (
    <div className={`flex items-center p-3 ${isDark ? 'bg-white/5' : 'bg-gray-100'} rounded-full`}>
      <input
        type="text"
        placeholder="Type a message..."
        className={`flex-grow p-3 ${isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-white text-gray-900 placeholder-gray-400'} 
          rounded-full focus:outline-none`}
      />
      <button 
        className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
        <Send size={20} />
      </button>
    </div>
  );
};

const RightSidebar = () => {
  const { isDark } = useTheme();
  return (
    <div className="w-64 space-y-4">
      <div className={`${isDark ? 'bg-black/30 backdrop-blur-xl' : 'bg-white/90'} rounded-2xl p-4`}>
        <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Online Friends</h3>
      </div>
      <div className={`${isDark ? 'bg-black/30 backdrop-blur-xl' : 'bg-white/90'} rounded-2xl p-4`}>
        <h3 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Recent Chats</h3>
      </div>
    </div>
  );
};

const ChatBox = () => {
  const { currentUser } = useAuth();
  const { isDark, setIsDark } = useTheme();



  const [messages] = useState([
    { id: 1, sender: 'Alice', content: 'Hi Bob, how are you doing today?', time: '12:45' },
    { id: 2, sender: 'Bob', content: "Hello Alice! I'm doing great, thanks for asking. How about you?", time: '12:46' },
    { id: 3, sender: 'Alice', content: "I'm good too! Just working on some new designs.", time: '12:47' },
    { id: 4, sender: 'Bob', content: "That sounds interesting! Can't wait to see what you come up with.", time: '12:48' },
  ]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(69);

  const handleNotificationClick = () => {
    setShowNotification(true);
    setNotificationCount(prevCount => prevCount - 1);
  };
  

  const handleNotificationClose = () => {
    setShowNotification(false);
  };

  return currentUser ? (
    <div className={`relative min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-8`}>
      {showNotification && (
        <Notification onClose={handleNotificationClose} />
      )}
      
      <Sidebar 
        onNotificationClick={handleNotificationClick}
        notificationCount={notificationCount}
      />

      <div className={`${isDark ? 'bg-black/30 backdrop-blur-xl' : 'bg-white/90'} 
        rounded-3xl w-full max-w-6xl p-8 ${isDark ? 'text-white' : 'text-gray-900'} shadow-2xl`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Hello, {currentUser.email}!</h2>
          <IconButton 
            icon={isDark ? <Sun size={20} /> : <Moon size={20} />}
            onClick={() => setIsDark(!isDark)}
          />
        </div>

        <div className="flex space-x-6">
          <div className={`flex-grow ${isDark ? 'bg-white/5' : 'bg-gray-50'} rounded-2xl p-6`}>
            <MessageList messages={messages} />
            <MessageInput />
          </div>
          <RightSidebar />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={'/login'} />
  );
};

export default ChatBox;