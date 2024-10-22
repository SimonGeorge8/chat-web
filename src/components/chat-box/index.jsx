import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import {  BellDot, MessageSquare, Send, Sun, Moon, LogOut, UserCircle2, MessageCircle, Clock } from 'lucide-react';
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
  updateDoc,
  serverTimestamp,
  or ,
  and,
  arrayUnion,
  deleteDoc,
  onSnapshot
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';

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

const ChatList = ({ chats, onSelectChat, selectedChatId }) => {
  const { isDark } = useTheme();
  const { currentUser } = useAuth();

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
  const [chats, setChats] = useState([]);
  const [pendingRequests, setPendingRequests] = useState({
    sent: [],
    received: []
  });
  const [messages, setMessages] = useState([]);
  const [sharedSecretKey, setSharedSecretKey] = useState('');
  const [encryptionInitialized, setEncryptionInitialized] = useState(false);

  useEffect(() => {
    if (!currentUser) return;

    // Listener for accepted chats
    const chatsRef = collection(db, 'chats');
    const acceptedChatsQuery = query(
      chatsRef,
      and(
        or(
          where('participants', 'array-contains', currentUser.uid),
          where('participantEmails', 'array-contains', currentUser.email)
        ),
        where('status', '==', 'accepted')
      )
    );

    const unsubscribeChats = onSnapshot(acceptedChatsQuery, (snapshot) => {
      const chatsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setChats(chatsData);
    });

    

    // Listener for received requests
    const receivedRequestsQuery = query(
      chatsRef,
      and(
        where('recipientEmail', '==', currentUser.email),
        where('status', '==', 'pending')
      )
    );

    // Listener for sent requests
    const sentRequestsQuery = query(
      chatsRef,
      and(
        where('senderEmail', '==', currentUser.email),
        where('status', '==', 'pending')
      )
    );

    const unsubscribeReceivedRequests = onSnapshot(receivedRequestsQuery, (snapshot) => {
      const receivedRequests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendingRequests(prev => ({ ...prev, received: receivedRequests }));
    });

    const unsubscribeSentRequests = onSnapshot(sentRequestsQuery, (snapshot) => {
      const sentRequests = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPendingRequests(prev => ({ ...prev, sent: sentRequests }));
    });

    return () => {
      unsubscribeChats();
      unsubscribeReceivedRequests();
      unsubscribeSentRequests();
    };
  }, [currentUser]);

  useEffect(() => {
    if (!selectedChat) return;

    const messagesQuery = query(
      collection(db, 'chats', selectedChat.id, 'messages'),
      orderBy('createdAt', 'asc'),
      limit(50)
    );

    const unsubscribeMessages = onSnapshot(messagesQuery, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(messagesData);
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    return () => unsubscribeMessages();
  }, [selectedChat]);

  const handleAcceptRequest = async (chatId) => {
    try {
      const chatRef = doc(db, 'chats', chatId);
      await updateDoc(chatRef, {
        status: 'accepted',
        participants: arrayUnion(currentUser.uid)
      });
      setErrorMessage('Chat request accepted successfully');
    } catch (error) {
      console.error('Error accepting chat request:', error);
      setErrorMessage('Failed to accept chat request. Please try again.');
    }
  };

  const handleRejectRequest = async (chatId) => {
    try {
      const chatRef = doc(db, 'chats', chatId);
      await deleteDoc(chatRef);
      setErrorMessage('Chat request rejected');
    } catch (error) {
      console.error('Error rejecting chat request:', error);
      setErrorMessage('Failed to reject chat request. Please try again.');
    }
  };

  const handleCancelRequest = async (chatId) => {
    try {
      const chatRef = doc(db, 'chats', chatId);
      await deleteDoc(chatRef);
      setErrorMessage('Chat request cancelled');
    } catch (error) {
      console.error('Error cancelling chat request:', error);
      setErrorMessage('Failed to cancel chat request. Please try again.');
    }
  };

  const createNewChat = async (otherUserEmail) => {
    if (!otherUserEmail?.trim()) {
      setErrorMessage('Please provide a valid email address');
      return;
    }
  
    try {
      // Convert email to lowercase and trim whitespace for consistency
      const trimmedEmail = otherUserEmail.toLowerCase().trim();
  
      // Check if the other user exists
      const userQuery = query(
        collection(db, 'user-list'), 
        where('email', '==', trimmedEmail)
      );
      const userSnapshot = await getDocs(userQuery);
  
      if (userSnapshot.empty) {
        setErrorMessage('User does not exist');
        return;
      }
  
      // Check for existing chats where the current user is a participant
      const chatQuery = query(
        collection(db, 'chats'),
        where('participantEmails', 'array-contains', currentUser.email)
      );
      const chatSnapshot = await getDocs(chatQuery);
  
      // Find accepted chat with the other user
      const acceptedChat = chatSnapshot.docs.find((doc) => {
        const data = doc.data();
        return (
          data.participantEmails.includes(trimmedEmail) && 
          data.status === 'accepted'
        );
      });
  
      if (acceptedChat) {
        setSelectedChat({
          id: acceptedChat.id,
          ...acceptedChat.data()
        });
        setErrorMessage('');
        return;
      }
  
      // Check for pending requests sent by the current user
      const pendingChat = chatSnapshot.docs.find((doc) => {
        const data = doc.data();
        return (
          data.participantEmails.includes(trimmedEmail) && 
          data.status === 'pending' && 
          data.senderEmail === currentUser.email
        );
      });
  
      if (pendingChat) {
        setErrorMessage('Chat request already sent and pending');
        return;
      }
  
      // Create a new chat document
      const newChatData = {
        participants: [currentUser.uid],
        participantEmails: [currentUser.email, trimmedEmail],
        senderEmail: currentUser.email,
        recipientEmail: trimmedEmail,
        status: 'pending',
        createdAt: serverTimestamp(),
        lastMessage: null,
        lastMessageAt: null,
      };
  
      // Create new document in the 'chats' collection
      await addDoc(collection(db, 'chats'), newChatData);
  
      setErrorMessage('Chat request sent successfully');
    } catch (error) {
      console.error('Error creating chat request:', error);
      setErrorMessage('Failed to send chat request. Please try again.');
      throw error;
    }
  };
  

  const getOtherParticipantEmail = (chat) => {
    return chat?.participantEmails?.find(email => email !== currentUser.email) || '';
  };

  const handleSendMessage = async (messageContent) => {
    if (!selectedChat || !messageContent.trim()) return;

    try {
      //Here ADD E2EE 
      const messagesRef = collection(db, 'chats', selectedChat.id, 'messages');
      await addDoc(messagesRef, {
        content: messageContent,
        senderId: currentUser.uid,
        senderEmail: currentUser.email,
        createdAt: serverTimestamp()
      });

      const chatRef = doc(db, 'chats', selectedChat.id);
      await updateDoc(chatRef, {
        lastMessage: messageContent,
        lastMessageAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error sending message:', error);
      setErrorMessage('Failed to send message. Please try again.');
    }
  };
  const handleSignOut = async () => {
    try {
      await doSignOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      setErrorMessage('Failed to sign out. Please try again.');
    }
  };

  return currentUser ? (
    <div className={`relative min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center p-8`}>
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
          <div className={`${
            errorMessage.includes('successfully') || errorMessage.includes('rejected') || errorMessage.includes('cancelled')
              ? 'bg-green-500/10 border border-green-500/50 text-green-500'
              : 'bg-red-500/10 border border-red-500/50 text-red-500'
          } p-3 rounded-lg mb-6 text-sm`}>
            {errorMessage}
          </div>
        )}
      
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Chat App</h2>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
              <UserCircle2 size={20} />
              <span className="text-sm font-medium">{currentUser.email}</span>
            </div>
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
            <button
              onClick={handleSignOut}
              className={`px-4 py-2 rounded-lg ${isDark ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200'} flex items-center gap-2 transition-colors`}
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>

        <div className="flex space-x-6">
          <div className="w-64 space-y-6">
            {(pendingRequests.received.length > 0 || pendingRequests.sent.length > 0) && (
              <div className={`${isDark ? 'bg-black/30 backdrop-blur-xl' : 'bg-white/90'} rounded-2xl p-4`}>
                <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'} flex items-center gap-2`}>
                  <BellDot className="w-5 h-5" />
                  Chat Requests
                </h3>
                
                {pendingRequests.received.length > 0 && (
                  <div className="mb-4">
                    <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                      Received Requests
                    </h4>
                    <div className="space-y-3">
                      {pendingRequests.received.map((request) => (
                        <div key={request.id} className={`p-3 rounded-lg ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                          <p className={`text-sm mb-2 ${isDark ? 'text-white/90' : 'text-gray-700'}`}>
                            From: {request.senderEmail}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAcceptRequest(request.id)}
                              className="px-3 py-1 rounded bg-green-500 text-white text-sm"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleRejectRequest(request.id)}
                              className="px-3 py-1 rounded bg-red-500 text-white text-sm"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {pendingRequests.sent.length > 0 && (
                  <div>
                    <h4 className={`text-sm font-medium mb-2 ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                      Sent Requests
                    </h4>
                    <div className="space-y-3">
                      {pendingRequests.sent.map((request) => (
                        <div key={request.id} className={`p-3 rounded-lg ${isDark ? 'bg-white/10' : 'bg-gray-100'}`}>
                          <p className={`text-sm mb-2 ${isDark ? 'text-white/90' : 'text-gray-700'}`}>
                            To: {request.recipientEmail}
                          </p>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm text-yellow-500">Pending</span>
                            <button
                              onClick={() => handleCancelRequest(request.id)}
                              className="ml-auto px-3 py-1 rounded bg-gray-500 text-white text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <ChatList
              chats={chats}
              onSelectChat={setSelectedChat}
              selectedChatId={selectedChat?.id}
            />
          </div>
          
          <div className={`flex-grow ${isDark ? 'bg-white/5' : 'bg-gray-50'} rounded-2xl p-6`}>
            {selectedChat ? (
              <>
                <div className={`mb-4 p-4 ${isDark ? 'bg-white/10' : 'bg-gray-100'} rounded-lg`}>
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <UserCircle2 className="w-6 h-6" />
                    {getOtherParticipantEmail(selectedChat)}

                  </h3>
                </div>
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