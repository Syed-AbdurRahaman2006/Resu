import React from 'react';

const ModernTemplate = ({ resumeData }) => {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    certifications
  } = resumeData;

  return (
    <div className="modern-template p-8 max-w-[800px] mx-auto bg-white">
      {/* Header with accent color */}
      <div className="bg-blue-600 text-white p-8 rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-2">{personalInfo?.fullName}</h1>
        <p className="text-xl opacity-90">{personalInfo?.title}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {personalInfo?.email}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {personalInfo?.phone}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {personalInfo?.location}
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1">
          {/* Summary */}
          {personalInfo?.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Summary</h2>
              <p className="text-gray-700">{personalInfo.summary}</p>
            </div>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{edu.institution}</h3>
                  <p className="text-gray-600 text-sm">{edu.degree}</p>
                  <p className="text-gray-500 text-sm">{edu.startDate} - {edu.endDate}</p>
                  {edu.gpa && <p className="text-gray-700 text-sm">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2">
          {/* Experience */}
          {experience?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <p className="text-blue-600">{exp.company}</p>
                    </div>
                    <p className="text-gray-600 text-sm">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <ul className="list-disc ml-5 mt-2 text-gray-700">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Projects</h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-4">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-gray-700">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications?.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-blue-600 mb-2">Certifications</h2>
              {certifications.map((cert, index) => (
                <div key={index} className="mb-2">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-gray-600">{cert.issuer} | {cert.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate; 