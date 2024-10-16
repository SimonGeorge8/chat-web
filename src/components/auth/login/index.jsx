import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-200">
      {/* Centered and Smaller Chat Background */}
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-md w-full max-w-md p-6 z-0">
          {/* Chat Header */}
          <div className="bg-gray-50 text-gray-800 p-4 rounded-t-3xl border-b border-gray-200">
            <h2 className="text-3xl font-bold text-center text-gray-900 tracking-tight"> ChatWeb </h2>
          </div>

          <div className="artboard phone-2 p-4 h-60 overflow-y-auto space-y-4">
            {/* Example Chat Message (Static, fake messages) */}
            <p className="text-gray-500">This is a sample chat background with messages.</p>
          </div>

          {/* Chat Input */}
          <div className="flex items-center border-t p-3 bg-gray-50 rounded-b-3xl">
            <input
              type="text"
              className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="iMessage"
              disabled
            />
            <button
              className="ml-3 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Frosted Glass Login Card (Overlay with Blur) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl w-full max-w-md sm:max-w-lg p-10 z-10">
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

          <form className="space-y-6">
            {/* Email Field */}
            <label className="flex items-center gap-3 p-3 bg-gray-200/70 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-600 opacity-80"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="flex-grow bg-transparent focus:outline-none"
                placeholder="Email"
              />
            </label>

            {/* Password Field */}
            <label className="flex items-center gap-3 p-3 bg-gray-200/70 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-600 opacity-80"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="flex-grow bg-transparent focus:outline-none"
                placeholder="Password"
              />
            </label>

            {/* Submit Button */}
            <div className="form-control mt-8">
              <button
                onClick={() => navigate('/home')}
                className="w-full py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none"
              >
                Login
              </button>
            </div>
          </form>

          {/* Google Sign-in Button */}
          <div className="mt-4">
            <button
              className="w-full py-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 focus:outline-none flex items-center justify-center gap-2"
              onClick={() => console.log("Sign in with Google")}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="Google Logo"
                className="h-5 w-5"
              />
              Sign in with Google
            </button>
          </div>

          {/* Optional Links */}
          <div className="flex justify-between mt-4 text-sm">
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
            <button
              onClick={() => navigate('/register')}
              className="text-blue-500 hover:underline bg-transparent border-none cursor-pointer"
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
