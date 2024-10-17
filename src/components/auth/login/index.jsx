import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailandPassword, doSignInWithEmailandPassword, doSignInWithGoogle } from '../../../firebase/auth';



const Login = ({ onLogin, onRegister, onGoogleLogin }) => {

    const navigate = useNavigate();
    const { userLoggedIn } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isSigningIn , setisSigningIn ] = useState(false)
    const [errorMessage, seErrorMessaage]  = useState('')


  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setisSigningIn(true)
      await doSignInWithEmailandPassword( email , password )
    }
  };


  const onGoogleSignIn = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setisSigningIn(true)
      doSignInWithGoogle().catch( err => {
        setisSigningIn(false)
      })
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
                <p className="text-white/60 text-sm">Welcome to ChatWeb!</p>
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

      {/* Login Card Overlay */}
      <div className="relative bg-black/30 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md p-8 z-10">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Login</h2>

          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Email Field */}
            <label className="flex items-center gap-3 p-4 bg-white/5 rounded-full">
              <Mail size={20} className="text-white/60" />
              <input
                type="text"
                required
                value = {email} onChange={(e) => {setEmail(e.target.value)}}
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
                value = {password} onChange={(e) => {setPassword(e.target.value)}}
                className="flex-grow bg-transparent text-white placeholder-white/40 focus:outline-none"
                placeholder="Password"
              />
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none transition-colors duration-200"
            >
              Login
            </button>
          </form>

          {/* Google Sign-in Button */}
          <div className="mt-6">
            <button
              className="w-full py-4 bg-white/10 text-white rounded-full shadow-lg hover:bg-white/20 focus:outline-none transition-colors duration-200 flex items-center justify-center gap-3"
              onClick={onGoogleLogin}
            >
              <img
                src="/api/placeholder/20/20"
                alt="Google Logo"
                className="h-5 w-5"
              />
              Sign in with Google
            </button>
          </div>

          {/* Optional Links */}
          <div className="flex justify-between mt-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors duration-200">
              Forgot password?
            </a>
            <button
              onClick={ () => navigate('/register')}
              className="text-white/60 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;