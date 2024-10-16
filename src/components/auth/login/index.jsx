const Login = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gray-100">
      {/* Chat Background */}
      <div className="bg-white rounded-3xl shadow-md w-full max-w-lg sm:max-w-2xl">
        {/* Chat Header */}
        <div className="bg-gray-50 text-gray-800 p-4 rounded-t-3xl border-b border-gray-200">
          <h2 className="text-lg font-semibold text-center">Messages</h2>
        </div>              

        <div className="artboard phone-2 p-4 h-80 overflow-y-auto space-y-4">
          {/* Example Chat Message */}
                 </div>

        {/* Chat Input */}
        <div className="flex items-center border-t p-3 bg-gray-50 rounded-b-3xl">
          <input
            type="text"
            className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="iMessage"
          />
          <button
            className="ml-3 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Send
          </button>
        </div>
      </div>

      {/* Frosted Glass Login Card (Overlay with Blur) */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-lg rounded-3xl shadow-lg w-full max-w-md sm:max-w-lg p-8 z-10">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">Login</h2>
          
          <form className="space-y-4">

            {/* Email Field */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="White"
                className="h-4 w-4 opacity-70">
                <path
                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path
                  d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input type="text" className="grow" placeholder="Email" />
            </label>

      
            {/* Password Field */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd" />
              </svg>
              <input type="password" className="grow" placeholder="Password" />
            </label>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="btn btn-primary w-full rounded-full p-3">Login</button>
            </div>
          </form>

          {/* Optional Links (like forgot password) */}
          <div className="flex justify-between mt-4 text-sm">
            <a href="#" className="link link-hover">Forgot password?</a>
            <a href="#" className="link link-hover">Create account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
