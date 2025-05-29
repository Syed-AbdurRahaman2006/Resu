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
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^[0-9+\-\s()]*$/, 'Invalid phone number')
    .required('Phone number is required'),
  linkedin: Yup.string()
    .url('Invalid LinkedIn URL')
    .matches(
      /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+$/,
      'Invalid LinkedIn profile URL'
    ),
  github: Yup.string()
    .url('Invalid GitHub URL')
    .matches(
      /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9-]+$/,
      'Invalid GitHub profile URL'
    ),
  website: Yup.string().url('Invalid website URL'),
});

const ContactInfoForm = ({ data, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: data?.email || '',
      phone: data?.phone || '',
      linkedin: data?.linkedin || '',
      github: data?.github || '',
      website: data?.website || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await axios.put('/api/resumes/contact-info', values);
        toast.success('Contact information saved successfully');
        onNext();
      } catch (error) {
        toast.error('Failed to save contact information');
        console.error('Error saving contact info:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Paper elevation={2} className="p-6">
      <Typography variant="h5" component="h2" className="mb-4">
        Contact Information
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="phone"
              name="phone"
              label="Phone Number"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="linkedin"
              name="linkedin"
              label="LinkedIn Profile"
              value={formik.values.linkedin}
              onChange={formik.handleChange}
              error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
              helperText={formik.touched.linkedin && formik.errors.linkedin}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="github"
              name="github"
              label="GitHub Profile"
              value={formik.values.github}
              onChange={formik.handleChange}
              error={formik.touched.github && Boolean(formik.errors.github)}
              helperText={formik.touched.github && formik.errors.github}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="website"
              name="website"
              label="Personal Website"
              value={formik.values.website}
              onChange={formik.handleChange}
              error={formik.touched.website && Boolean(formik.errors.website)}
              helperText={formik.touched.website && formik.errors.website}
            />
          </Grid>

          <Grid item xs={12}>
            <Box className="flex justify-end space-x-4">
              <Button
                variant="outlined"
                onClick={onBack}
                disabled={loading}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
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

export default ContactInfoForm; 