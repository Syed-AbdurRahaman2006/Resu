import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CUSTOM_IMG from '../assets/png.pdf-compressed-1.png';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Modal from '../components/ResumeTemplates/Modal';

const FeatureCard = ({ title, description, icon }) => (
  <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 text-center">
    <div className="text-5xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authPage, setAuthPage] = useState('login');

  const openModal = () => setAuthModalOpen(true);
  const closeModal = () => {
    setAuthModalOpen(false);
    setAuthPage('login');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 font-sans">
      <div className="container mx-auto px-4 py-12">

        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold text-gray-900 tracking-wide">🚀 RESUMATCH</div>
          <button
            className="bg-gray-900 text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-gray-700 transition duration-300"
            onClick={openModal}
            aria-label="Login or Sign Up"
          >
            Login / Sign Up
          </button>
        </header>

        {/* Hero Section */}
        <main className="flex flex-col md:flex-row items-center gap-14">
          <div className="w-full md:w-1/2">
            <h1 className="text-5xl font-extrabold leading-snug text-gray-900 mb-6">
              Create standout resumes <br />
              <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#7182ff_0%,#3cff52_100%)] bg-[length:200%_200%] animate-text-shine">
                effortlessly and instantly
              </span>
            </h1>
            <p className="text-lg text-gray-700 mb-8 max-w-md">
              Build a powerful resume in minutes with RESUMATCH — your smart and intuitive resume builder.
            </p>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-8 py-3 rounded-xl shadow-lg transition-all"
              onClick={openModal}
            >
              Start Building
            </button>
          </div>

          <div className="w-full md:w-1/2">
            <img
              src={CUSTOM_IMG}
              alt="Preview of resume builder interface"
              className="w-full rounded-2xl shadow-2xl object-cover"
            />
          </div>
        </main>

        {/* Features */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            🔧 Smart Features to Showcase Your Talent
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <FeatureCard
              icon="✍️"
              title="User-Friendly Editing"
              description="Easily update your resume sections with instant formatting and real-time preview."
            />
            <FeatureCard
              icon="🎨"
              title="Modern Templates"
              description="Select from beautifully designed templates tailored to your needs."
            />
            <FeatureCard
              icon="⚡"
              title="Instant PDF Export"
              description="Generate your polished PDF resume in a single click."
            />
            <FeatureCard
              icon="📊"
              title="Skill-Based Suggestions"
              description="Receive intelligent recommendations aligned with your career goals."
            />
          </div>
        </section>

        {/* Specializations */}
        <section className="mt-28">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">
            🎯 Tailored For Every Profession
          </h2>
          <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
            Whether you're a developer, designer, marketer, student, or manager — RESUMATCH adapts to your field with specific templates and insights.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {["Developer", "Designer", "Marketer", "Student", "Manager", "Engineer"].map(role => (
              <span
                key={role}
                className="bg-purple-100 text-purple-800 font-medium px-5 py-2 rounded-full text-sm hover:bg-purple-200 transition"
              >
                {role}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-6 mt-20 border-t">
        Made with ❤️ by <span className="font-semibold text-gray-800">RESUMATCH Team</span> — Happy Coding!
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={authModalOpen}
        onClose={closeModal}
        hideHeader
      >
        {authPage === 'login' && <Login setCurrentPage={setAuthPage} />}
        {authPage === 'signup' && <SignUp setCurrentPage={setAuthPage} />}
      </Modal>
    </div>
  );
};

export default LandingPage;
