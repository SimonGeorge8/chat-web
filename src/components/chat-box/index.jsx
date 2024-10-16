const ChatBox = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-3xl shadow-md w-full max-w-lg sm:max-w-2xl">
          {/* Chat Header */}
          <div className="bg-gray-50 text-gray-800 p-4 rounded-t-3xl border-b border-gray-200">
            <h2 className="text-lg font-semibold text-center">Messages</h2>
          </div>
      
          {/* Chat Messages */}
          <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-150px)]">
            {/* First Message (start) */}
            <div className="chat chat-start flex items-start space-x-3">
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    alt="Avatar"
                    className="object-cover w-full h-full"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <div>
                <div className="chat-header flex items-center space-x-2 text-sm">
                  <span className="font-semibold">Alice</span>
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble bg-gray-200 text-black p-4 rounded-2xl rounded-bl-none max-w-sm">
                  Hi Bob
                </div>
                <div className="chat-footer text-xs opacity-50">Delivered</div>
              </div>
            </div>
  
            {/* Second Message (end) */}
            <div className="chat chat-end flex items-start justify-end space-x-3 space-x-reverse">
              <div>
                <div className="chat-header flex items-center justify-end space-x-2 space-x-reverse text-sm">
                  <span className="font-semibold">Bob</span>
                  <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble bg-blue-500 text-white p-4 rounded-2xl rounded-br-none max-w-sm">
                  Hello 
                </div>
                <div className="chat-footer text-xs opacity-50">Seen at 12:46</div>
              </div>
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    alt="Avatar"
                    className="object-cover w-full h-full"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
            </div>
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
      </div>
    );
  };
  export default ChatBox