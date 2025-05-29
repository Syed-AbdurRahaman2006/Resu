import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './app/store';
import ResumeBuilder from './components/resume/ResumeBuilder';
import Navbar from './components/common/Navbar';
import { Toaster } from "react-hot-toast"
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard";
import EditResume from './pages/ResumeUpdate/forms/EditResume';
import UserProvider from './context/userContext';

const App = () =>{
  return (
    <UserProvider>
      <Provider store={store}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<ResumeBuilder />} />
                <Route path="/login" element={<Login />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/resume/:resumeId" element={<EditResume />} />
              </Routes>
            </main>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </Router>
      </Provider>
      <Toaster
        toastOptions={{
          className:"",
          style: {
            fontSize:"13px",
          },
        }}
        />   
    </UserProvider>
  );
};

export default App



