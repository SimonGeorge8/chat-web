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
    const [errorMessage, setErrorMessaage]  = useState('')


  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setisSigningIn(true)
      try{
      await doSignInWithEmailandPassword( email , password )
      } catch(error) {
        setErrorMessaage(error.message);
        setisSigningIn(false);
      }
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
          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">
              {errorMessage}
            </div>
          )}

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
              onClick={onGoogleSignIn}
              className="w-full py-4 bg-white text-gray-600 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none transition-colors duration-200 flex items-center justify-center gap-1.5"
            >
              <div className="bg-white p-1 rounded-full">
                <svg viewBox="0 0 48 48" className="h-5 w-5">
                  <path
                    fill="#EA4335"
                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                  />
                  <path
                    fill="#34A853"
                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                  />
                  <path fill="none" d="M0 0h48v48H0z" />
                </svg>
              </div>
              Sign in with Google
            </button>
          </div>

          {/* Optional Links */}
          <div className="flex justify-between mt-6 text-sm">
          <button
              onClick={ () => navigate('forgot-password')}
              className="text-white/60 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
            >
              Forgot password?
            </button>
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