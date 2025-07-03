import React, { useState } from "react";
import { Route, Switch } from "wouter";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./hoc/ProtectedRoute";
import ChatPage from "./pages/ChatPage";
import Profile from "./pages/Profile";
import MyProfile from "./pages/MyProfile";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App() {

  const [showOptions, setShowOptions] = useState(false)
  const handleOptions = () => {
    if (showOptions) {
      setShowOptions(false)
    } else {
      setShowOptions(true)
    }
  }

  const handleShowOptions = () => {
    if (showOptions) {
      setShowOptions(false)
      localStorage.removeItem('showOptions')
    } 
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Sticky Top Navbar */}
      <Navbar handleOptions={handleOptions} showOptions={showOptions}/>

      {/* Scrollable Center Content */}
      <main className="flex-1 overflow-y-auto" onClick={() => handleShowOptions()}>
        <Switch>
          <Route path="/">
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          </Route>

          <Route path="/chat">
            <ProtectedRoute>
              <ChatPage />
            </ProtectedRoute>
          </Route>

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/user/viewprofile">
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          </Route>
          <Route path="/myprofile">
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          </Route>

          <Route>404 - Not Found</Route>
        </Switch>
      </main>

      {/* Sticky Bottom Footer */}
      <Footer />

      
      {/* Toast Notifications */}
     <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
      />
    </div>
  );
}
