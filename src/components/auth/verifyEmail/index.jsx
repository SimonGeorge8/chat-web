import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doApplyActionCode, doSendEmailVerification } from '../../../firebase/auth';

const EmailVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userLoggedIn, currentUser } = useAuth();

  const [isProcessing, setIsProcessing] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('processing'); // 'processing', 'success', 'error'

  useEffect(() => {
    // Get the action code from the URL
    const queryParams = new URLSearchParams(location.search);
    const actionCode = queryParams.get('oobCode');

    if (actionCode) {
      verifyEmail(actionCode);
    } else {
      setErrorMessage('Invalid verification link.');
      setVerificationStatus('error');
      setIsProcessing(false);
    }
  }, [location]);

  const verifyEmail = async (actionCode) => {
    try {
      await doApplyActionCode(actionCode);
      setSuccessMessage('Email verified successfully!');
      setVerificationStatus('success');
      // Redirect to home page after 3 seconds
      setTimeout(() => navigate('/home'), 3000);
    } catch (error) {
      setErrorMessage(error.message);
      setVerificationStatus('error');
    } finally {
      setIsProcessing(false);
    }
  };

  const resendVerification = async () => {
    if (!currentUser) {
      setErrorMessage('No user found. Please try logging in again.');
      return;
    }

    try {
      await doSendEmailVerification(currentUser);
      setSuccessMessage('Verification email sent! Check your inbox.');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'processing':
        return <RefreshCw size={48} className="text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle size={48} className="text-green-500" />;
      case 'error':
        return <XCircle size={48} className="text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center p-8">
      {userLoggedIn && currentUser?.emailVerified && (
        <Navigate to={'/home'} replace={true} />
      )}
      
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
                <p className="text-white/60 text-sm">Verifying your email address...</p>
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

      {/* Email Verification Card Overlay */}
      <div className="relative bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 z-10">
        <div className="card-body">
          <button
            onClick={() => navigate('/login')}
            className="absolute left-8 top-8 text-white/60 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={24} />
          </button>
          
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Email Verification</h2>

          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            {getStatusIcon()}
          </div>
          
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

          {/* Status Message */}
          <div className="text-center mb-8">
            <p className="text-white/80">
              {isProcessing ? (
                'Verifying your email address...'
              ) : verificationStatus === 'success' ? (
                'Your email has been verified successfully!'
              ) : (
                'There was a problem verifying your email.'
              )}
            </p>
          </div>

          {/* Resend Verification Button */}
          {verificationStatus === 'error' && (
            <button
              onClick={resendVerification}
              className="w-full py-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none transition-colors duration-200"
            >
              Resend Verification Email
            </button>
          )}

          {/* Return to Login */}
          {!isProcessing && (
            <p className="text-white/60 text-sm text-center mt-6">
              {verificationStatus === 'success' ? (
                'Redirecting to home page...'
              ) : (
                'You can close this window and try again with the new verification link.'
              )}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;