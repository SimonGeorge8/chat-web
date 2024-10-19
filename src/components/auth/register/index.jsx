import React, { useState, useEffect } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { auth } from '../../../firebase/firebase';
import { doCreateUserWithEmailandPassword, doSendEmailVerification, doSignOut } from '../../../firebase/auth';

const Register = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [isCheckingEmail, setIsCheckingEmail] = useState(false);

  // Check email verification status
  useEffect(() => {
    if (auth.currentUser) {
      const checkVerification = async () => {
        try {
          await auth.currentUser.reload();
          if (auth.currentUser.emailVerified) {
            // Only now create/update the user document in your database
            try {
              // Add your database creation/update logic here
              // For example: await createUserDocument(auth.currentUser.uid, formData.fullName);
              navigate('/home');
            } catch (error) {
              console.error('Error creating user document:', error);
              setErrorMessage('Error completing registration. Please try again.');
              // Delete the unverified user if we can't create their document
              await auth.currentUser.delete();
            }
          }
        } catch (error) {
          console.error('Error checking verification:', error);
        }
      };

      const interval = setInterval(checkVerification, 3000);
      return () => clearInterval(interval);
    }
  }, [navigate, isCheckingEmail, formData.fullName]);

  // Add listener for auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && !user.emailVerified) {
        // Set up a timeout to delete unverified users after 1 hour
        const timeout = setTimeout(async () => {
          try {
            if (auth.currentUser && !auth.currentUser.emailVerified) {
              await auth.currentUser.delete();
              setErrorMessage('Verification time expired. Please register again.');
              setVerificationSent(false);
              setIsRegistering(false);
            }
          } catch (error) {
            console.error('Error deleting unverified user:', error);
          }
        }, 3600000); // 1 hour in milliseconds

        return () => clearTimeout(timeout);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        // Create the user account
        const userCredential = await doCreateUserWithEmailandPassword(
          formData.fullName,
          formData.email, 
          formData.password
        );

        // Send verification email
        await doSendEmailVerification(userCredential.user);
        setVerificationSent(true);
        setIsCheckingEmail(true);

      } catch (error) {
        setErrorMessage(
          error.code === 'auth/email-already-in-use'
            ? 'This email is already registered. Please login instead.'
            : error.message
        );
        setIsRegistering(false);
      }
    }
  };

  const handleResendVerification = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await doSendEmailVerification(user);
        setErrorMessage('');
        // Show success message
        const tempDiv = document.createElement('div');
        tempDiv.className = 'text-green-400 mt-2';
        tempDiv.textContent = 'Verification email resent!';
        document.querySelector('.card-body').appendChild(tempDiv);
        setTimeout(() => tempDiv.remove(), 3000);
      }
    } catch (error) {
      setErrorMessage('Error resending verification email. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      // Delete the unverified user account when signing out during verification
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        await auth.currentUser.delete();
      }
      await doSignOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Redirect if user is already verified
  if (userLoggedIn && auth.currentUser?.emailVerified) {
    return <Navigate to="/home" replace={true} />;
  }

  // Render verification sent state
  if (verificationSent) {
    return (
      <div className="relative min-h-screen bg-gray-900 flex items-center justify-center p-8">
        <div className="relative bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 z-10">
          <div className="card-body text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Verify Your Email</h2>
            <div className="bg-blue-500/10 border border-blue-500/50 text-blue-400 p-4 rounded-lg mb-6">
              <p className="mb-3">We've sent a verification email to:</p>
              <p className="font-semibold">{formData.email}</p>
            </div>
            <div className="space-y-4 text-white/60">
              <p>Please check your email and click the verification link to complete your registration.</p>
              <p className="text-sm">
                Didn't receive the email? Check your spam folder or{' '}
                <button
                  onClick={handleResendVerification}
                  className="text-blue-400 hover:text-blue-300 underline cursor-pointer"
                >
                  resend verification email
                </button>
              </p>
            </div>
            <div className="mt-6 space-y-4">
              <button
                onClick={handleSignOut}
                className="w-full py-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none transition-colors duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main registration form (rest of the component remains the same)
  return (
    <div className="relative min-h-screen bg-gray-900 flex items-center justify-center p-8">
      {/* Original registration form JSX... */}
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
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleInputChange}
                className="flex-grow bg-transparent text-white placeholder-white/40 focus:outline-none"
                placeholder="Full Name"
              />
            </label>

            {/* Email Field */}
            <label className="flex items-center gap-3 p-4 bg-white/5 rounded-full">
              <Mail size={20} className="text-white/60" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="flex-grow bg-transparent text-white placeholder-white/40 focus:outline-none"
                placeholder="Email"
              />
            </label>

            {/* Password Field */}
            <label className="flex items-center gap-3 p-4 bg-white/5 rounded-full">
              <Lock size={20} className="text-white/60" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="flex-grow bg-transparent text-white placeholder-white/40 focus:outline-none"
                placeholder="Password"
              />
            </label>

            {/* Confirm Password Field */}
            <label className="flex items-center gap-3 p-4 bg-white/5 rounded-full">
              <Lock size={20} className="text-white/60" />
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
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