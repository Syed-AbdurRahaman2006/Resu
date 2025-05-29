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
} from '@mui/material';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .max(100, 'Full name must not exceed 100 characters'),
  title: Yup.string()
    .required('Professional title is required')
    .max(100, 'Title must not exceed 100 characters'),
  summary: Yup.string()
    .required('Professional summary is required')
    .min(50, 'Summary must be at least 50 characters')
    .max(500, 'Summary must not exceed 500 characters'),
  location: Yup.string()
    .required('Location is required')
    .max(100, 'Location must not exceed 100 characters'),
});

const ProfileInfoForm = ({ data, onNext }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullName: data?.fullName || '',
      title: data?.title || '',
      summary: data?.summary || '',
      location: data?.location || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.put('/api/resumes/profile-info', values);
        toast.success('Profile information saved successfully');
        onNext();
      } catch (error) {
        toast.error('Failed to save profile information');
        console.error('Error saving profile info:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Paper elevation={2} className="p-6">
      <Typography variant="h5" component="h2" className="mb-4">
        Profile Information
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="fullName"
              name="fullName"
              label="Full Name"
              value={formik.values.fullName}
              onChange={formik.handleChange}
              error={formik.touched.fullName && Boolean(formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Professional Title"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="summary"
              name="summary"
              label="Professional Summary"
              multiline
              rows={4}
              value={formik.values.summary}
              onChange={formik.handleChange}
              error={formik.touched.summary && Boolean(formik.errors.summary)}
              helperText={formik.touched.summary && formik.errors.summary}
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
            <Box className="flex justify-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                className="ml-4"
              >
                {loading ? 'Saving...' : 'Save & Continue'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProfileInfoForm; 