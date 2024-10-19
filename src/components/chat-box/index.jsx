import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { Home, Search, BellDot, Settings, MessageSquare, Send, Sun, Moon, LogOut } from 'lucide-react';
import { UserCircle2, MessageCircle, Circle, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/authContext';
import { useNavigate, Navigate } from 'react-router-dom';
import { doSignOut } from '../../firebase/auth';
import { 
  collection, 
  doc,
  query, 
  where,
  orderBy, 
  limit, 
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
  or 
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const ThemeContext = createContext();


export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);
  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

const Notification = ({ onClose, message = "You have an unread message" }) => {
  const { isDark } = useTheme();
  return (
    <div role="alert" 
      className={`fixed top-4 right-4 z-50 flex items-center gap-4 p-4 rounded-lg shadow-lg
        ${isDark ? 'bg-black/30 backdrop-blur-xl' : 'bg-white/90'} text-white`}>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        className="h-6 w-6 shrink-0 stroke-blue-400"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div>
        <h3 className="font-bold">New message!</h3>
        <div className="text-xs opacity-75">{message}</div>
      </div>
      <button
        onClick={onClose}
        className="ml-4 px-2 py-1 rounded-lg text-sm font-medium
          bg-white/10 hover:bg-white/20 transition-colors"
      >
        X
      </button>
    </div>
  );
};

const IconButton = ({ icon, onClick, badge }) => {
  const { isDark } = useTheme();
  return (
    <button 
      onClick={onClick}
      className={`relative w-10 h-10 flex items-center justify-center 
        ${isDark ? 'text-white/60 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
        focus:outline-none transition-colors duration-200 ease-in-out`}
    >
      {icon}
      {badge && (
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};

const Sidebar = ({ onNotificationClick, notificationCount }) => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  
  return (
    <div className={`fixed left-4 top-1/2 transform -translate-y-1/2 
      ${isDark ? 'bg-black/30 backdrop-blur-xl' : 'bg-white/90'} 
      shadow-lg rounded-2xl p-3 w-16 flex flex-col items-center space-y-8 z-50`}>
      <nav className="flex flex-col space-y-8">
        <IconButton icon={<Home size={20} />} />
        <IconButton icon={<Search size={20} />} />
        <IconButton 
          icon={<BellDot size={20} />} 
          onClick={onNotificationClick}
          badge={notificationCount > 0 ? notificationCount : null}
        />
        <IconButton icon={<Settings size={20} />} />
        <IconButton 
          icon={<LogOut size={20} />}
          onClick={() => { doSignOut().then(() => { navigate('/login') }) }}
        />
      </nav>
    </div>
  );
};
const MessageList = ({ messages, scrollRef }) => {
  const { isDark } = useTheme();
  const { currentUser } = useAuth();
  
  return (
    <div className="space-y-6 mb-4 h-[calc(100vh-400px)] overflow-y-auto px-4">
   
      {messages?.map((msg) => (
        
        <div key={msg.id} className={`flex ${msg.senderId === currentUser.uid ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs ${
            msg.senderId === currentUser.uid
              ? 'bg-blue-500/80'
              : isDark ? 'bg-white/10' : 'bg-gray-200/80'
          } rounded-2xl p-4 shadow-lg backdrop-blur-sm`}>
            <p className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'} mb-1`}>{msg.senderEmail}</p>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-white' : 'text-gray-900'}`}>{msg.content}</p>
            <p className="text-xs opacity-50 mt-2 text-right">
              {new Date(msg.createdAt?.toDate()).toLocaleTimeString()}
            </p>
          </div>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};

const ChatList = ({ onSelectChat, selectedChatId }) => {
  const { isDark } = useTheme();
  const { currentUser } = useAuth();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const chatsRef = collection(db, 'chats');
      const q = query(
        chatsRef,
        or(
          where('participants', 'array-contains', currentUser.uid),
          where('participantEmails', 'array-contains', currentUser.email)
        )
      );
      
      const querySnapshot = await getDocs(q);
      const chatsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(chatsData);
    };

    fetchChats();
  }, [currentUser]);

  return (
    <div className={`${isDark ? 'bg-black/30 backdrop-blur-xl' : 'bg-white/90'} rounded-2xl p-4`}>
      <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
        <MessageCircle className="w-5 h-5" />
        Your Chats
      </h3>
      <div className="space-y-3">
        {chats.map((chat) => {
          const otherParticipant = chat.participantEmails.find(
            email => email !== currentUser.email
          );
          
          return (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat)}
              className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer
                ${selectedChatId === chat.id ? (isDark ? 'bg-white/10' : 'bg-gray-100') : ''}
                hover:${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
            >
              <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-white/10' : 'bg-gray-100'} flex items-center justify-center`}>
                <UserCircle2 className={`w-6 h-6 ${isDark ? 'text-white/60' : 'text-gray-600'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`truncate text-sm font-medium ${isDark ? 'text-white/90' : 'text-gray-700'}`}>
                  {otherParticipant}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NewChatModal = ({ isOpen, onClose, onStartChat }) => {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onStartChat(email);
    setEmail('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-96`}>
        <h3 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Start New Chat
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            className={`w-full p-2 rounded-lg mb-4 ${
              isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
            }`}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-500 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-500 text-white"
            >
              Start Chat
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
const MessageInput = ({ onSendMessage }) => {
  const { isDark } = useTheme();
  const [formValue, setFormValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formValue.trim() === '') return;

    await onSendMessage(formValue);
    setFormValue('');
  };

  return (
    <form onSubmit={handleSubmit} className={`flex items-center p-3 ${isDark ? 'bg-white/5' : 'bg-gray-100'} rounded-full`}>
      <input
        type="text"
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        placeholder="Type a message..."
        className={`flex-grow p-3 ${
          isDark ? 'bg-white/10 text-white placeholder-white/40' : 'bg-white text-gray-900 placeholder-gray-400'
        } rounded-full focus:outline-none`}
      />
      <button
        type="submit"
        className="ml-2 p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

const ChatBox = () => {
  const { currentUser } = useAuth();
  const { isDark, setIsDark } = useTheme();
  const scrollRef = useRef();
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState(null);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Query messages for selected chat
  const messagesQuery = selectedChat ? query(
    collection(db, 'chats', selectedChat.id, 'messages'),
    orderBy('createdAt', 'asc'),
    limit(50)
  ) : null;
  
  const [messages] = useCollectionData(messagesQuery, { idField: 'id' });

  const createNewChat = async (otherUserEmail) => {
    try {
      // First check if user exists
      const userSnapshot = await getDocs(
        query(collection(db, 'user-list'), where('email', '==', otherUserEmail))
      );

      if (userSnapshot.empty) {
        setErrorMessage('User does not exist');
        return;
      }

      // Then check if chat already exists
      const chatSnapshot = await getDocs(
        query(
          collection(db, 'chats'),
          where('participantEmails', 'array-contains', [otherUserEmail, currentUser.email])
        )
      );


      if (!chatSnapshot.empty) {
        // Get the first existing chat
        const existingChat = chatSnapshot.docs[0];
        setSelectedChat({
          id: existingChat.id,
          ...existingChat.data()
        });
        setErrorMessage('');
        return;
      }

      // Create new chat if user exists and chat doesn't exist
      const chatRef = doc(collection(db, 'chats'));
      await setDoc(chatRef, {
        participants: [currentUser.uid],
        participantEmails: [currentUser.email, otherUserEmail],
        createdAt: serverTimestamp(),
        lastMessage: null,
        lastMessageAt: null
      });

      // Set the new chat as selected
      const chatData = await getDoc(chatRef);
      setSelectedChat({
        id: chatRef.id,
        ...chatData.data()
      });
      setErrorMessage('');
      
    } catch (error) {
      console.error('Error creating new chat:', error);
      setErrorMessage('Failed to create chat. Please try again.');
    }
  };

  const handleSendMessage = async (messageContent) => {
    if (!selectedChat || !messageContent.trim()) return;

    try {
      const messagesRef = collection(db, 'chats', selectedChat.id, 'messages');
      await addDoc(messagesRef, {
        content: messageContent,
        senderId: currentUser.uid,
        senderEmail: currentUser.email,
        createdAt: serverTimestamp()
      });

      // Update last message in chat document
      const chatRef = doc(db, 'chats', selectedChat.id);
      await updateDoc(chatRef, {
        lastMessage: messageContent,
        lastMessageAt: serverTimestamp()
      });

      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  return currentUser ? (
    <div className={`relative min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-8`}>
        <Sidebar/>
      <NewChatModal
        isOpen={showNewChatModal}
        onClose={() => {
          setShowNewChatModal(false);
          setErrorMessage('');
        }}
        onStartChat={createNewChat}
      />
    
      <div className={`${isDark ? 'bg-black/30 backdrop-blur-xl' : 'bg-white/90'} 
        rounded-3xl w-full max-w-6xl p-8 ${isDark ? 'text-white' : 'text-gray-900'} shadow-2xl`}>
        {errorMessage && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">
            {errorMessage}
          </div>
        )}
      
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Chat App</h2>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowNewChatModal(true)}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white flex items-center gap-2"
            >
              <MessageSquare size={20} />
              New Chat
            </button>
            <IconButton 
              icon={isDark ? <Sun size={20} /> : <Moon size={20} />}
              onClick={() => setIsDark(!isDark)}
            />
          </div>
        </div>

        <div className="flex space-x-6">
          <div className="w-64">
            <ChatList
              onSelectChat={setSelectedChat}
              selectedChatId={selectedChat?.id}
            />
          </div>
          
          <div className={`flex-grow ${isDark ? 'bg-white/5' : 'bg-gray-50'} rounded-2xl p-6`}>
            {selectedChat ? (
              <>
                <MessageList messages={messages} scrollRef={scrollRef} />
                <MessageInput onSendMessage={handleSendMessage} />
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className={`text-lg ${isDark ? 'text-white/60' : 'text-gray-500'}`}>
                  Select a chat or start a new conversation
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default ChatBox;