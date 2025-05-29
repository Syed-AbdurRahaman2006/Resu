import React, { useState } from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

const ResumeBuilder = () => {
  const [activeTab, setActiveTab] = useState('form');
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    responsibilities: ['']
  });

  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });

  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    technologies: ['']
  });

  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: ''
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleAddExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExperience]
    }));
    setNewExperience({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      responsibilities: ['']
    });
  };

  const handleAddEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEducation]
    }));
    setNewEducation({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      gpa: ''
    });
  };

  const handleAddProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));
    setNewProject({
      name: '',
      description: '',
      technologies: ['']
    });
  };

  const handleAddCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, newCertification]
    }));
    setNewCertification({
      name: '',
      issuer: '',
      date: ''
    });
  };

  const handleAddSkill = (skill) => {
    if (skill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, skill.trim()]
      }));
    }
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'classic':
        return <ClassicTemplate resumeData={resumeData} />;
      case 'modern':
        return <ModernTemplate resumeData={resumeData} />;
      case 'creative':
        return <CreativeTemplate resumeData={resumeData} />;
      default:
        return <ClassicTemplate resumeData={resumeData} />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Template Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Choose Template</h2>
        <div className="grid grid-cols-3 gap-4">
          <button
            onClick={() => setSelectedTemplate('classic')}
            className={`p-4 border rounded-lg ${
              selectedTemplate === 'classic' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            Classic
          </button>
          <button
            onClick={() => setSelectedTemplate('modern')}
            className={`p-4 border rounded-lg ${
              selectedTemplate === 'modern' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            Modern
          </button>
          <button
            onClick={() => setSelectedTemplate('creative')}
            className={`p-4 border rounded-lg ${
              selectedTemplate === 'creative' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            Creative
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 ${
              activeTab === 'form' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
            }`}
          >
            Form
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-4 py-2 ${
              activeTab === 'preview' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {activeTab === 'form' ? (
        <div className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={resumeData.personalInfo.fullName}
                onChange={handlePersonalInfoChange}
                className="border rounded p-2"
              />
              <input
                type="text"
                name="title"
                placeholder="Professional Title"
                value={resumeData.personalInfo.title}
                onChange={handlePersonalInfoChange}
                className="border rounded p-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={resumeData.personalInfo.email}
                onChange={handlePersonalInfoChange}
                className="border rounded p-2"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={resumeData.personalInfo.phone}
                onChange={handlePersonalInfoChange}
                className="border rounded p-2"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={resumeData.personalInfo.location}
                onChange={handlePersonalInfoChange}
                className="border rounded p-2"
              />
            </div>
            <textarea
              name="summary"
              placeholder="Professional Summary"
              value={resumeData.personalInfo.summary}
              onChange={handlePersonalInfoChange}
              className="border rounded p-2 w-full mt-4"
              rows="4"
            />
          </div>

          {/* Experience */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Experience</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Company"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
                  className="border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={newExperience.position}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
                  className="border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Start Date"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
                  className="border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
                  className="border rounded p-2"
                />
              </div>
              <div>
                <label className="block mb-2">Responsibilities</label>
                {newExperience.responsibilities.map((resp, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="Responsibility"
                    value={resp}
                    onChange={(e) => {
                      const newResponsibilities = [...newExperience.responsibilities];
                      newResponsibilities[index] = e.target.value;
                      setNewExperience(prev => ({ ...prev, responsibilities: newResponsibilities }));
                    }}
                    className="border rounded p-2 w-full mb-2"
                  />
                ))}
                <button
                  onClick={() => setNewExperience(prev => ({
                    ...prev,
                    responsibilities: [...prev.responsibilities, '']
                  }))}
                  className="text-blue-500"
                >
                  + Add Responsibility
                </button>
              </div>
              <button
                onClick={handleAddExperience}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Experience
              </button>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Education</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Institution"
                  value={newEducation.institution}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
                  className="border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Degree"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
                  className="border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Start Date"
                  value={newEducation.startDate}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, startDate: e.target.value }))}
                  className="border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="End Date"
                  value={newEducation.endDate}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, endDate: e.target.value }))}
                  className="border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="GPA"
                  value={newEducation.gpa}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, gpa: e.target.value }))}
                  className="border rounded p-2"
                />
              </div>
              <button
                onClick={handleAddEducation}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Education
              </button>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Skills</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a skill"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddSkill(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="border rounded p-2 flex-1"
              />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {resumeData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 px-3 py-1 rounded-full"
                >
                  {skill}
                  <button
                    onClick={() => {
                      setResumeData(prev => ({
                        ...prev,
                        skills: prev.skills.filter((_, i) => i !== index)
                      }));
                    }}
                    className="ml-2 text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Projects</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProject.name}
                  onChange={(e) => setNewProject(prev => ({ ...prev, name: e.target.value }))}
                  className="border rounded p-2"
                />
                <textarea
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject(prev => ({ ...prev, description: e.target.value }))}
                  className="border rounded p-2"
                  rows="3"
                />
              </div>
              <div>
                <label className="block mb-2">Technologies</label>
                {newProject.technologies.map((tech, index) => (
                  <input
                    key={index}
                    type="text"
                    placeholder="Technology"
                    value={tech}
                    onChange={(e) => {
                      const newTechnologies = [...newProject.technologies];
                      newTechnologies[index] = e.target.value;
                      setNewProject(prev => ({ ...prev, technologies: newTechnologies }));
                    }}
                    className="border rounded p-2 w-full mb-2"
                  />
                ))}
                <button
                  onClick={() => setNewProject(prev => ({
                    ...prev,
                    technologies: [...prev.technologies, '']
                  }))}
                  className="text-blue-500"
                >
                  + Add Technology
                </button>
              </div>
              <button
                onClick={handleAddProject}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Project
              </button>
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Certifications</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Certification Name"
                  value={newCertification.name}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, name: e.target.value }))}
                  className="border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Issuing Organization"
                  value={newCertification.issuer}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, issuer: e.target.value }))}
                  className="border rounded p-2"
                />
                <input
                  type="text"
                  placeholder="Date"
                  value={newCertification.date}
                  onChange={(e) => setNewCertification(prev => ({ ...prev, date: e.target.value }))}
                  className="border rounded p-2"
                />
              </div>
              <button
                onClick={handleAddCertification}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Certification
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 p-8 rounded-lg">
          {renderTemplate()}
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder; 