import ForgotPassword from "./components/auth/forgotPassword";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import EmailVerification from "./components/auth/verifyEmail";
import ChatBox from "./components/chat-box";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";

function App() {
  const routesArray = [
    {
      // If Route is empty go to login in 
      path: "*",
      element: <Login />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <ChatBox />,
    },
    {
      path: "/home/recent-chats",
      element: <ChatBox />,
    },
    {
      path: "/home/new-chats",
      element: <ChatBox />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword/>
    },
    {
      path: 'login/forgot-password',
      element: <ForgotPassword/>
    },
    {
      path: 'login/verifyEmail',
      element: <EmailVerification/>
    }
  ];
  // let because we want the value to change no like the const 
  let routesElement = useRoutes(routesArray);
  return (
    <AuthProvider>
      <div className="w-full h-screen flex flex-col">{routesElement}</div>
    </AuthProvider>
  );
}

export default App;
