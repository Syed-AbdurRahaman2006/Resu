import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const validationSchema = Yup.object({
  company: Yup.string().required('Company name is required'),
  position: Yup.string().required('Position is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().min(
    Yup.ref('startDate'),
    'End date must be after start date'
  ),
  current: Yup.boolean(),
  description: Yup.string()
    .required('Job description is required')
    .min(50, 'Description must be at least 50 characters'),
  location: Yup.string().required('Location is required'),
});

const WorkExperienceForm = ({ data, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [experiences, setExperiences] = useState(data || []);
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      location: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const newExperience = {
          ...values,
          id: Date.now().toString(),
        };
        await axios.post('/api/resumes/work-experience', newExperience);
        setExperiences([...experiences, newExperience]);
        resetForm();
        setShowForm(false);
        toast.success('Work experience added successfully');
      } catch (error) {
        toast.error('Failed to add work experience');
        console.error('Error adding work experience:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/resumes/work-experience/${id}`);
      setExperiences(experiences.filter((exp) => exp.id !== id));
      toast.success('Work experience deleted successfully');
    } catch (error) {
      toast.error('Failed to delete work experience');
      console.error('Error deleting work experience:', error);
    }
  };

  const handleContinue = async () => {
    try {
      await axios.put('/api/resumes/work-experience', experiences);
      onNext();
    } catch (error) {
      toast.error('Failed to save work experiences');
      console.error('Error saving work experiences:', error);
    }
  };

  return (
    <Paper elevation={2} className="p-6">
      <Typography variant="h5" component="h2" className="mb-4">
        Work Experience
      </Typography>

      <List>
        {experiences.map((experience) => (
          <ListItem key={experience.id} divider>
            <ListItemText
              primary={`${experience.position} at ${experience.company}`}
              secondary={`${experience.startDate} - ${
                experience.current ? 'Present' : experience.endDate
              }`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(experience.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {!showForm ? (
        <Box className="mt-4">
          <Button
            startIcon={<AddIcon />}
            onClick={() => setShowForm(true)}
            variant="outlined"
          >
            Add Work Experience
          </Button>
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="company"
                name="company"
                label="Company"
                value={formik.values.company}
                onChange={formik.handleChange}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="position"
                name="position"
                label="Position"
                value={formik.values.position}
                onChange={formik.handleChange}
                error={formik.touched.position && Boolean(formik.errors.position)}
                helperText={formik.touched.position && formik.errors.position}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="startDate"
                name="startDate"
                label="Start Date"
                type="date"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                helperText={formik.touched.startDate && formik.errors.startDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="endDate"
                name="endDate"
                label="End Date"
                type="date"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                helperText={formik.touched.endDate && formik.errors.endDate}
                InputLabelProps={{ shrink: true }}
                disabled={formik.values.current}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="location"
                name="location"
                label="Location"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Job Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
            </Grid>

            <Grid item xs={12}>
              <Box className="flex justify-end space-x-4">
                <Button
                  variant="outlined"
                  onClick={() => setShowForm(false)}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Experience'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}

      <Box className="flex justify-end space-x-4 mt-6">
        <Button
          variant="outlined"
          onClick={onBack}
          disabled={loading}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleContinue}
          disabled={loading || experiences.length === 0}
        >
          Save & Continue
        </Button>
      </Box>
    </Paper>
  );
};

export default WorkExperienceForm; 