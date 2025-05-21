import React from 'react';
import { FaPlus, FaFileAlt, FaHistory, FaUserEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // data for recent resumes
  const recentResumes = [
    { id: 1, title: 'Software Engineer Resume', lastModified: '2024-03-20' },
    { id: 2, title: 'Product Manager Resume', lastModified: '2024-03-19' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Welcome to ResuMatch</h1>
        <p className="text-gray-600 mt-2">Create and manage your professional resumes with ease</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link to="/create-resume" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3">
            <FaPlus className="text-blue-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-800">Create New Resume</h3>
              <p className="text-sm text-gray-600">Start from scratch</p>
            </div>
          </div>
        </Link>

        <Link to="/templates" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3">
            <FaFileAlt className="text-green-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-800">Browse Templates</h3>
              <p className="text-sm text-gray-600">Choose from templates</p>
            </div>
          </div>
        </Link>

        <Link to="/my-resumes" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3">
            <FaHistory className="text-purple-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-800">My Resumes</h3>
              <p className="text-sm text-gray-600">View all resumes</p>
            </div>
          </div>
        </Link>

        <Link to="/profile" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center space-x-3">
            <FaUserEdit className="text-orange-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-gray-800">Edit Profile</h3>
              <p className="text-sm text-gray-600">Update your information</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Resumes Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Resumes</h2>
        <div className="space-y-4">
          {recentResumes.map((resume) => (
            <div key={resume.id} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-gray-800">{resume.title}</h3>
                  <p className="text-sm text-gray-500">Last modified: {resume.lastModified}</p>
                </div>
                <div className="space-x-2">
                  <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;