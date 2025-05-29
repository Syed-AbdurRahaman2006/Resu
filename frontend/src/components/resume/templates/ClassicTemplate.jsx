import React from 'react';

const ClassicTemplate = ({ resumeData }) => {
  const {
    personalInfo,
    education,
    experience,
    skills,
    projects,
    certifications
  } = resumeData;

  return (
    <div className="classic-template p-8 max-w-[800px] mx-auto bg-white">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">{personalInfo?.fullName}</h1>
        <p className="text-gray-600">{personalInfo?.title}</p>
        <div className="flex justify-center gap-4 mt-2 text-sm">
          <span>{personalInfo?.email}</span>
          <span>{personalInfo?.phone}</span>
          <span>{personalInfo?.location}</span>
        </div>
      </div>

      {/* Summary */}
      {personalInfo?.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">Summary</h2>
          <p className="text-gray-700">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">Experience</h2>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{exp.company}</h3>
              <p className="text-gray-600">{exp.position} | {exp.startDate} - {exp.endDate}</p>
              <ul className="list-disc ml-5 mt-2">
                {exp.responsibilities.map((resp, idx) => (
                  <li key={idx} className="text-gray-700">{resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">Education</h2>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{edu.institution}</h3>
              <p className="text-gray-600">{edu.degree} | {edu.startDate} - {edu.endDate}</p>
              {edu.gpa && <p className="text-gray-700">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 px-3 py-1 rounded">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-gray-700">{project.description}</p>
              {project.technologies && (
                <p className="text-gray-600 mt-1">Technologies: {project.technologies.join(', ')}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold border-b-2 border-gray-300 mb-2">Certifications</h2>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <h3 className="font-semibold">{cert.name}</h3>
              <p className="text-gray-600">{cert.issuer} | {cert.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate; 