import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  resumes: [],
  currentResume: {
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
  },
  selectedTemplate: 'classic',
  loading: false,
  error: null
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setCurrentResume: (state, action) => {
      state.currentResume = action.payload;
    },
    updatePersonalInfo: (state, action) => {
      state.currentResume.personalInfo = {
        ...state.currentResume.personalInfo,
        ...action.payload
      };
    },
    addExperience: (state, action) => {
      state.currentResume.experience.push(action.payload);
    },
    updateExperience: (state, action) => {
      const { index, experience } = action.payload;
      state.currentResume.experience[index] = experience;
    },
    removeExperience: (state, action) => {
      state.currentResume.experience = state.currentResume.experience.filter(
        (_, index) => index !== action.payload
      );
    },
    addEducation: (state, action) => {
      state.currentResume.education.push(action.payload);
    },
    updateEducation: (state, action) => {
      const { index, education } = action.payload;
      state.currentResume.education[index] = education;
    },
    removeEducation: (state, action) => {
      state.currentResume.education = state.currentResume.education.filter(
        (_, index) => index !== action.payload
      );
    },
    addSkill: (state, action) => {
      if (!state.currentResume.skills.includes(action.payload)) {
        state.currentResume.skills.push(action.payload);
      }
    },
    removeSkill: (state, action) => {
      state.currentResume.skills = state.currentResume.skills.filter(
        skill => skill !== action.payload
      );
    },
    addProject: (state, action) => {
      state.currentResume.projects.push(action.payload);
    },
    updateProject: (state, action) => {
      const { index, project } = action.payload;
      state.currentResume.projects[index] = project;
    },
    removeProject: (state, action) => {
      state.currentResume.projects = state.currentResume.projects.filter(
        (_, index) => index !== action.payload
      );
    },
    addCertification: (state, action) => {
      state.currentResume.certifications.push(action.payload);
    },
    updateCertification: (state, action) => {
      const { index, certification } = action.payload;
      state.currentResume.certifications[index] = certification;
    },
    removeCertification: (state, action) => {
      state.currentResume.certifications = state.currentResume.certifications.filter(
        (_, index) => index !== action.payload
      );
    },
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    saveResume: (state, action) => {
      state.resumes.push(action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const {
  setCurrentResume,
  updatePersonalInfo,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
  addCertification,
  updateCertification,
  removeCertification,
  setSelectedTemplate,
  saveResume,
  setLoading,
  setError
} = resumeSlice.actions;

export default resumeSlice.reducer; 