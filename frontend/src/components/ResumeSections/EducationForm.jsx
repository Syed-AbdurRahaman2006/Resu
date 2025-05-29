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
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const validationSchema = Yup.object({
  institution: Yup.string().required('Institution name is required'),
  degree: Yup.string().required('Degree is required'),
  field: Yup.string().required('Field of study is required'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().min(
    Yup.ref('startDate'),
    'End date must be after start date'
  ),
  current: Yup.boolean(),
  location: Yup.string().required('Location is required'),
  gpa: Yup.number()
    .min(0, 'GPA must be greater than or equal to 0')
    .max(4, 'GPA must be less than or equal to 4'),
  description: Yup.string(),
});

const EducationForm = ({ data, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [educations, setEducations] = useState(data || []);
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      location: '',
      gpa: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const newEducation = {
          ...values,
          id: Date.now().toString(),
        };
        await axios.post('/api/resumes/education', newEducation);
        setEducations([...educations, newEducation]);
        resetForm();
        setShowForm(false);
        toast.success('Education added successfully');
      } catch (error) {
        toast.error('Failed to add education');
        console.error('Error adding education:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/resumes/education/${id}`);
      setEducations(educations.filter((edu) => edu.id !== id));
      toast.success('Education deleted successfully');
    } catch (error) {
      toast.error('Failed to delete education');
      console.error('Error deleting education:', error);
    }
  };

  const handleContinue = async () => {
    try {
      await axios.put('/api/resumes/education', educations);
      onNext();
    } catch (error) {
      toast.error('Failed to save education');
      console.error('Error saving education:', error);
    }
  };

  return (
    <Paper elevation={2} className="p-6">
      <Typography variant="h5" component="h2" className="mb-4">
        Education
      </Typography>

      <List>
        {educations.map((education) => (
          <ListItem key={education.id} divider>
            <ListItemText
              primary={`${education.degree} in ${education.field} at ${education.institution}`}
              secondary={`${education.startDate} - ${
                education.current ? 'Present' : education.endDate
              }${education.gpa ? ` • GPA: ${education.gpa}` : ''}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(education.id)}
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
            Add Education
          </Button>
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="institution"
                name="institution"
                label="Institution"
                value={formik.values.institution}
                onChange={formik.handleChange}
                error={formik.touched.institution && Boolean(formik.errors.institution)}
                helperText={formik.touched.institution && formik.errors.institution}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="degree"
                name="degree"
                label="Degree"
                value={formik.values.degree}
                onChange={formik.handleChange}
                error={formik.touched.degree && Boolean(formik.errors.degree)}
                helperText={formik.touched.degree && formik.errors.degree}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="field"
                name="field"
                label="Field of Study"
                value={formik.values.field}
                onChange={formik.handleChange}
                error={formik.touched.field && Boolean(formik.errors.field)}
                helperText={formik.touched.field && formik.errors.field}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="gpa"
                name="gpa"
                label="GPA"
                type="number"
                inputProps={{ step: 0.01, min: 0, max: 4 }}
                value={formik.values.gpa}
                onChange={formik.handleChange}
                error={formik.touched.gpa && Boolean(formik.errors.gpa)}
                helperText={formik.touched.gpa && formik.errors.gpa}
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formik.values.current}
                    onChange={formik.handleChange}
                    name="current"
                  />
                }
                label="Currently Studying"
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
                label="Additional Information"
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
                  {loading ? 'Adding...' : 'Add Education'}
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
          disabled={loading || educations.length === 0}
        >
          Save & Continue
        </Button>
      </Box>
    </Paper>
  );
};

export default EducationForm; 