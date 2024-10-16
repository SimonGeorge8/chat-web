const Register = () => {
    return (
      <div className="relative flex justify-center items-center min-h-screen bg-gray-200">
        

        {/* Frosted Glass Login Card */}
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl w-full max-w-lg sm:max-w-xl p-10 z-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Sign Up</h2>
          
          <form className="space-y-6">
            {/* Name Field */}
            <label className="flex items-center gap-3 p-3 bg-gray-200/70 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-600 opacity-80">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="flex-grow bg-transparent focus:outline-none"
                placeholder="Name"
              />
            </label>

            {/* Last Name Field */}
            <label className="flex items-center gap-3 p-3 bg-gray-200/70 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-600 opacity-80">
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="flex-grow bg-transparent focus:outline-none"
                placeholder="Last Name"
              />
            </label>

            {/* Email Field */}
            <label className="flex items-center gap-3 p-3 bg-gray-200/70 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 text-gray-600 opacity-80">
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="email"
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
                className="h-5 w-5 text-gray-600 opacity-80">
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd" />
              </svg>
              <input
                type="password"
                className="flex-grow bg-transparent focus:outline-none"
                placeholder="Password"
              />
            </label>

            {/* Submit Button */}
            <div className="form-control mt-8">
              <button className="w-full py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default Register;
