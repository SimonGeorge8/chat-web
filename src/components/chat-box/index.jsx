import React, { useState } from "react";

function Notification({ onClose }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md shadow-lg rounded-lg max-w-md mx-auto space-x-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-blue-500 h-6 w-6 shrink-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div>
        <h3 className="font-bold text-gray-700">New message!</h3>
        <div className="text-sm text-gray-500">You have an unread message</div>
      </div>
      <button
        onClick={onClose}
        className="bg-blue-500 text-white px-3 py-1 rounded-full shadow-md hover:bg-blue-600 focus:outline-none"
      >
        X
      </button>
    </div>
  );
}

const ChatBox = () => {
  const [showNotification, setShowNotification] = useState(false);

  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const handleHideNotification = () => {
    setShowNotification(false);
  };

  return (
    <div className="relative flex min-h-screen bg-gray-200">
      
      {/* Main Content */}
      <div className="flex-grow flex justify-center items-center p-8">
        {/* Notification Alert */}
        {showNotification && (
          <div className="absolute top-10 z-50">
            <Notification onClose={handleHideNotification} />
          </div>
        )}

        {/* Enlarged Chat Box with Apple-style Design */}
        <div className="bg-white/70 backdrop-blur-lg shadow-xl rounded-3xl w-full max-w-4xl p-8 relative z-10">
          {/* Chat Header */}
          <div className="bg-gray-50 p-5 rounded-t-3xl flex justify-center items-center space-x-2">
            <h2 className="text-4xl font-semibold text-gray-900">ChatWeb</h2>
          </div>

          {/* Chat Messages */}
          <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-220px)]">
            {/* First Message (start) */}
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                <img
                  alt="Avatar"
                  className="object-cover w-full h-full"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-semibold text-gray-700">Alice</span>
                  <time className="text-xs text-gray-500">12:45</time>
                </div>
                <div className="bg-gray-100 text-black p-4 rounded-2xl rounded-bl-none max-w-sm shadow-sm">
                  Hi Bob
                </div>
                <div className="text-xs text-gray-500 mt-1">Delivered</div>
              </div>
            </div>

            {/* Second Message (end) */}
            <div className="flex items-start justify-end space-x-3 space-x-reverse">
              <div>
                <div className="flex items-center justify-end space-x-2 space-x-reverse text-sm">
                  <span className="font-semibold text-gray-700">Bob</span>
                  <time className="text-xs text-gray-500">12:46</time>
                </div>
                <div className="bg-blue-500 text-white p-4 rounded-2xl rounded-br-none max-w-sm shadow-sm">
                  Hello
                </div>
                <div className="text-xs text-gray-500 mt-1">Seen at 12:46</div>
              </div>
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-md">
                <img
                  alt="Avatar"
                  className="object-cover w-full h-full"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex items-center border-t p-4 bg-gray-50 rounded-b-3xl">
            <input
              type="text"
              className="flex-grow p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 shadow-inner"
              placeholder="Type a message..."
            />
            <button
              onClick={handleShowNotification}
              className="ml-3 bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
