import React, { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailandPassword } from '../../../firebase/auth';

const Register = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering && password === confirmPassword) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailandPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    } else if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center p-8">
      {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
      
      {/* Chat Background Card */}
      <div className="absolute inset-0 flex justify-center items-center p-8">
        <div className="bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-6">
          {/* Chat Header */}
          <div className="bg-white/5 text-white p-4 rounded-2xl mb-4">
            <h2 className="text-2xl font-semibold text-center tracking-tight">ChatWeb</h2>
          </div>

          <div className="h-60 overflow-y-auto space-y-4 p-4">
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-2xl p-4 max-w-xs">
                <p className="text-white/60 text-sm">Welcome to ChatWeb! Create an account to get started.</p>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex items-center p-3 bg-white/5 rounded-2xl mt-4">
            <input
              type="text"
              className="flex-grow p-3 bg-white/10 text-white rounded-full focus:outline-none"
              placeholder="iMessage"
              disabled
            />
          </div>
        </div>
      </div>

      {/* Register Card Overlay */}
      <div className="relative bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 z-10">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Sign Up</h2>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">
              {errorMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Field */}
            <label className="flex items-center gap-3 p-4 bg-white/5 rounded-full">
              <User size={20} className="text-white/60" />
              <input
                type="text"
                required
                className="flex-grow bg-transparent text-white placeholder-white/40 focus:outline-none"
                placeholder="Full Name"
              />
            </label>

            {/* Email Field */}
            <label className="flex items-center gap-3 p-4 bg-white/5 rounded-full">
              <Mail size={20} className="text-white/60" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-transparent text-white placeholder-white/40 focus:outline-none"
                placeholder="Email"
              />
            </label>

            {/* Password Field */}
            <label className="flex items-center gap-3 p-4 bg-white/5 rounded-full">
              <Lock size={20} className="text-white/60" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-grow bg-transparent text-white placeholder-white/40 focus:outline-none"
                placeholder="Password"
              />
            </label>

            {/* Confirm Password Field */}
            <label className="flex items-center gap-3 p-4 bg-white/5 rounded-full">
              <Lock size={20} className="text-white/60" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-grow bg-transparent text-white placeholder-white/40 focus:outline-none"
                placeholder="Confirm Password"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isRegistering}
              className="w-full py-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none transition-colors duration-200 disabled:opacity-50"
            >
              {isRegistering ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Optional Links */}
          <div className="flex justify-center mt-6 text-sm">
            <span className="text-white/60">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-white/60 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
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