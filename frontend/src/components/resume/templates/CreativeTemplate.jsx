import React from 'react';

const CreativeTemplate = ({ resumeData }) => {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    certifications
  } = resumeData;

  return (
    <div className="creative-template p-8 max-w-[800px] mx-auto bg-white">
      {/* Header with diagonal design */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-pink-500 p-8 mb-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 transform rotate-45 translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-10 transform rotate-45 -translate-x-16 translate-y-16"></div>
        
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-bold mb-2 tracking-tight">{personalInfo?.fullName}</h1>
          <p className="text-2xl opacity-90 font-light">{personalInfo?.title}</p>
          <div className="flex flex-wrap gap-6 mt-6">
            <span className="flex items-center backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {personalInfo?.email}
            </span>
            <span className="flex items-center backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {personalInfo?.phone}
            </span>
            <span className="flex items-center backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {personalInfo?.location}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-4">
          {/* Summary */}
          {personalInfo?.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-purple-600 mb-3 border-l-4 border-purple-600 pl-3">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
            </div>
          )}

          {/* Skills */}
          {skills?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-purple-600 mb-3 border-l-4 border-purple-600 pl-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-purple-600 mb-3 border-l-4 border-purple-600 pl-3">Education</h2>
              {education.map((edu, index) => (
                <div key={index} className="mb-4 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple-600 before:rounded-full">
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
        <div className="col-span-8">
          {/* Experience */}
          {experience?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-purple-600 mb-3 border-l-4 border-purple-600 pl-3">Experience</h2>
              {experience.map((exp, index) => (
                <div key={index} className="mb-6 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple-600 before:rounded-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <p className="text-purple-600">{exp.company}</p>
                    </div>
                    <p className="text-gray-600 text-sm">{exp.startDate} - {exp.endDate}</p>
                  </div>
                  <ul className="list-none mt-2 text-gray-700 space-y-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-purple-600 mr-2">•</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects?.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-purple-600 mb-3 border-l-4 border-purple-600 pl-3">Projects</h2>
              {projects.map((project, index) => (
                <div key={index} className="mb-6 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple-600 before:rounded-full">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="text-gray-700 mt-1">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-sm">
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
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-purple-600 mb-3 border-l-4 border-purple-600 pl-3">Certifications</h2>
              {certifications.map((cert, index) => (
                <div key={index} className="mb-4 relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-purple-600 before:rounded-full">
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

export default CreativeTemplate; 