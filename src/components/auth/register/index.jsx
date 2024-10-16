import React, { useContext } from 'react';
import { Mail, Lock, User, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../chat-box'; 


const Register = ({ onRegister }) => {
  const { isDark, setIsDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRegister) onRegister();
  };

  const IconButton = ({ icon, onClick }) => {
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

  return (
    <div className={`relative min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-8`}>
      {/* Chat Background Card */}
      <div className="absolute inset-0 flex justify-center items-center p-8">
        <div className={`${isDark ? 'bg-gray-800/80' : 'bg-white/80'} 
          backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-6`}>
          {/* Chat Header */}
          <div className={`${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} 
            ${isDark ? 'text-white' : 'text-gray-900'} p-4 rounded-2xl mb-4`}>
            <h2 className="text-2xl font-semibold text-center tracking-tight">ChatWeb</h2>
          </div>

          <div className="h-60 overflow-y-auto space-y-4 p-4">
            {/* Example Chat Messages */}
            <div className="flex justify-start">
              <div className={`${isDark ? 'bg-gray-700/80' : 'bg-gray-200/80'} 
                rounded-2xl p-4 max-w-xs`}>
                <p className={`${isDark ? 'text-white/60' : 'text-gray-600'} text-sm`}>
                  Welcome to ChatWeb! Create an account to get started.
                </p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className={`flex items-center p-3 ${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} rounded-2xl mt-4`}>
            <input
              type="text"
              className={`flex-grow p-3 ${isDark ? 'bg-gray-800/50' : 'bg-gray-200/50'} 
                ${isDark ? 'text-white' : 'text-gray-900'} rounded-full focus:outline-none`}
              placeholder="iMessage"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Register Card Overlay */}
      <div className={`relative ${isDark ? 'bg-gray-800/80' : 'bg-white/80'} 
        backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 z-10`}>
        <div className="flex justify-end mb-4">
          <IconButton 
            icon={isDark ? <Sun size={20} /> : <Moon size={20} />}
            onClick={() => setIsDark(!isDark)}
          />
        </div>

        <div className="card-body">
          <h2 className={`text-3xl font-bold text-center mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Sign Up
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First Name Field */}
            <label className={`flex items-center gap-3 p-4 
              ${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} rounded-full`}>
              <User size={20} className={isDark ? 'text-white/60' : 'text-gray-600'} />
              <input
                type="text"
                className={`flex-grow bg-transparent ${isDark ? 'text-white placeholder-white/40' : 'text-gray-900 placeholder-gray-500'}
                  focus:outline-none`}
                placeholder="First Name"
              />
            </label>

            {/* Last Name Field */}
            <label className={`flex items-center gap-3 p-4 
              ${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} rounded-full`}>
              <User size={20} className={isDark ? 'text-white/60' : 'text-gray-600'} />
              <input
                type="text"
                className={`flex-grow bg-transparent ${isDark ? 'text-white placeholder-white/40' : 'text-gray-900 placeholder-gray-500'}
                  focus:outline-none`}
                placeholder="Last Name"
              />
            </label>

            {/* Email Field */}
            <label className={`flex items-center gap-3 p-4 
              ${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} rounded-full`}>
              <Mail size={20} className={isDark ? 'text-white/60' : 'text-gray-600'} />
              <input
                type="email"
                className={`flex-grow bg-transparent ${isDark ? 'text-white placeholder-white/40' : 'text-gray-900 placeholder-gray-500'}
                  focus:outline-none`}
                placeholder="Email"
              />
            </label>

            {/* Password Field */}
            <label className={`flex items-center gap-3 p-4 
              ${isDark ? 'bg-gray-900/50' : 'bg-gray-100/50'} rounded-full`}>
              <Lock size={20} className={isDark ? 'text-white/60' : 'text-gray-600'} />
              <input
                type="password"
                className={`flex-grow bg-transparent ${isDark ? 'text-white placeholder-white/40' : 'text-gray-900 placeholder-gray-500'}
                  focus:outline-none`}
                placeholder="Password"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-blue-500 text-white rounded-full shadow-lg 
                hover:bg-blue-600 focus:outline-none transition-colors duration-200"
            >
              Sign Up
            </button>
          </form>

          {/* Optional Links */}
          <div className="flex justify-center mt-6 text-sm">
            <span className={isDark ? 'text-white/60' : 'text-gray-600'}>
              Already have an account?{' '}
              <button
                onClick={() => window.history.back()}
                className={`${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                  transition-colors duration-200 bg-transparent border-none cursor-pointer`}
              >
                Login here
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;