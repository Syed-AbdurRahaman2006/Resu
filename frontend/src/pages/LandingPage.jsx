import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import CUSTOM_IMG from '../assets/png.pdf-compressed-1.png';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Modal from '../components/ResumeTemplates/Modal';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 text-center">
    <div className="text-5xl mb-4 ">{icon}</div>
    <h3 className="text-xl font-bold text-indigo-700 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authPage, setAuthPage] = useState('login');

  const openModal = () => setAuthModalOpen(true);
  const closeModal = () => {
    setAuthModalOpen(false);
    setAuthPage('login');
  };

  const handleCTA = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      openModal();
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white to-gray-50 font-sans">
      <div className="container mx-auto px-4 py-10">

        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-3xl font-bold text-gray-900 tracking-wide">🚀 RESUMATCH</h1>
          {user ? (
            <ProfileInfoCard />
          ) : (
            <button
              onClick={openModal}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold text-sm px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition"
              aria-label="Login or Sign Up"
            >
              Login / Sign Up
            </button>
          )}
        </header>

        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              Create standout resumes <br />
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#7182ff_0%,#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                effortlessly and instantly
              </span>
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Build a powerful resume in minutes with <span className="font-semibold text-purple-700">RESUMATCH</span> — your smart and intuitive resume builder.
            </p>
            <button
              onClick={handleCTA}
              className="bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-yellow-500 hover:to-pink-600 text-white font-semibold text-sm px-8 py-3 rounded-full shadow-md hover:shadow-xl transition transform hover:scale-105"
            >
              🚀 Start Building
            </button>
          </div>

          <div className="w-full md:w-1/2">
            <img
              src={CUSTOM_IMG}
              alt="Resume builder interface preview"
              loading="lazy"
              className="w-full rounded-3xl shadow-2xl border-4 border-purple-300 object-cover"
            />
          </div>
        </section>

        {/* Features Section */}
        <section className="mt-24">
          <h3 className="text-4xl font-bold text-center text-gray-900 mb-12">
            🔧 Smart Features to Showcase Your Talent
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon="✍️"
              title="User-Friendly Editing"
              description="Seamlessly update your resume sections with instant formatting and live preview."
            />
            <FeatureCard
              icon="🎨"
              title="Modern Templates"
              description="Choose from professionally designed templates that fit every job role."
            />
            <FeatureCard
              icon="⚡"
              title="Instant PDF Export"
              description="Download your resume as a professional PDF in one click."
            />
            <FeatureCard
              icon="📊"
              title="Skill-Based Suggestions"
              description="Get real-time suggestions based on job descriptions and market trends."
            />
            
          </div>
        </section>

              {/* Specializations Section */}
        <section className="mt-24 text-center">
          <h3 className="text-4xl font-bold text-gray-900 mb-6">
            🎯 Tailored For Every Profession
          </h3>
          <p className="text-gray-700 mb-10 max-w-2xl mx-auto text-lg">
            Whether you're a developer, designer, marketer, or student — <span className="text-purple-600 font-medium">RESUMATCH</span> offers tailored templates and suggestions for your field.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Developer",
              "Graphic Designer",
              "Marketer",
              "Student",
              "Manager",
              "Engineer",
              "Data Scientist",
              "Content Writer",
              "Business Analyst"
            ].map((role) => (
              <span
                key={role}
                className="bg-purple-100 text-purple-800 font-medium text-sm px-5 py-2 rounded-full hover:bg-purple-200 transition-all duration-150"
              >
                {role}
              </span>
            ))}
          </div>
        </section>
        </div>

      {/* Footer */}
      <footer className="mt-20 border-t bg-gray-100 text-center text-sm text-gray-600 py-6">
        Made with <span className="text-red-500">❤️</span> by <span className="font-semibold text-purple-600">RESUMATCH Team</span> — Happy Coding!
      </footer>

      {/* Auth Modal */}
      <Modal isOpen={authModalOpen} onClose={closeModal} hideHeader>
        {authPage === 'login' ? (
          <Login setCurrentPage={setAuthPage} />
        ) : (
          <SignUp setCurrentPage={setAuthPage} />
        )}
      </Modal>
    </div>
  );
};

export default LandingPage;
