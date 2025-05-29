import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Container, Paper, Stepper, Step, StepLabel, Typography } from '@mui/material';
import { toast } from 'react-hot-toast';
import axios from 'axios';

// Form Components
import ProfileInfoForm from '../components/ResumeSections/ProfileInfoForm';
import ContactInfoForm from '../components/ResumeSections/ContactInfoForm';
import WorkExperienceForm from '../components/ResumeSections/WorkExperienceForm';
import EducationForm from '../components/ResumeSections/EducationForm';
import SkillsForm from '../components/ResumeSections/SkillsForm';
import ProjectsForm from '../components/ResumeSections/ProjectsForm';
import CertificationsForm from '../components/ResumeSections/CertificationsForm';
import AdditionalInfoForm from '../components/ResumeSections/AdditionalInfoForm';

const steps = [
  'Profile Info',
  'Contact Info',
  'Work Experience',
  'Education',
  'Skills',
  'Projects',
  'Certifications',
  'Additional Info'
];

const ResumeEditor = () => {
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await axios.get(`/api/resumes/${id}`);
        setResumeData(response.data);
      } catch (error) {
        toast.error('Failed to fetch resume data');
        console.error('Error fetching resume:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchResume();
    }
  }, [id]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleStepClick = (step) => {
    setActiveStep(step);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <ProfileInfoForm data={resumeData?.profileInfo} onNext={handleNext} />;
      case 1:
        return <ContactInfoForm data={resumeData?.contactInfo} onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <WorkExperienceForm data={resumeData?.workExperience} onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <EducationForm data={resumeData?.education} onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <SkillsForm data={resumeData?.skills} onNext={handleNext} onBack={handleBack} />;
      case 5:
        return <ProjectsForm data={resumeData?.projects} onNext={handleNext} onBack={handleBack} />;
      case 6:
        return <CertificationsForm data={resumeData?.certifications} onNext={handleNext} onBack={handleBack} />;
      case 7:
        return <AdditionalInfoForm data={resumeData?.additionalInfo} onNext={handleNext} onBack={handleBack} />;
      default:
        return 'Unknown step';
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" className="py-8">
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Paper elevation={3} className="p-6">
        <Typography variant="h4" component="h1" className="mb-6 text-center">
          Resume Editor
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel className="mb-8">
          {steps.map((label, index) => (
            <Step key={label} onClick={() => handleStepClick(index)} className="cursor-pointer">
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box className="mt-8">
          {getStepContent(activeStep)}
        </Box>
      </Paper>
    </Container>
  );
};

export default ResumeEditor; 