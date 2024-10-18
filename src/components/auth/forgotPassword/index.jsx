import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doPasswordReset } from '../../../firebase/auth';
import { db } from '../../../firebase/firebase';
import { collection, addDoc } from "firebase/firestore";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isProcessing) {
      setIsProcessing(true);
      setErrorMessage('');
      setSuccessMessage('');
      
      try {
        const snapShot = await db.collection('user-list').where('email', '==', email).get()
        if(snapShot.empty){
            setErrorMessage('Email is not registered to database.')
        } else {
            await doPasswordReset(email);
            setSuccessMessage('Password reset email sent! Check your inbox.');
        }
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsProcessing(false);
      }
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
            {/* Example Chat Messages */}
            <div className="flex justify-start">
              <div className="bg-white/10 rounded-2xl p-4 max-w-xs">
                <p className="text-white/60 text-sm">Need to reset your password? No worries!</p>
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

      {/* Forgot Password Card Overlay */}
      <div className="relative bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 z-10">
        <div className="card-body">
          <button
            onClick={() => navigate('/login')}
            className="absolute left-8 top-8 text-white/60 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={24} />
          </button>
          
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Reset Password</h2>
          
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">
              {errorMessage}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-3 rounded-lg mb-6 text-sm">
              {successMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Email Field */}
            <label className="flex items-center gap-3 p-4 bg-white/5 rounded-full">
              <Mail size={20} className="text-white/60" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow bg-transparent text-white placeholder-white/40 focus:outline-none"
                placeholder="Enter your email"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Help Text */}
          <p className="text-white/60 text-sm text-center mt-6">
            We'll send you an email with instructions to reset your password.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;