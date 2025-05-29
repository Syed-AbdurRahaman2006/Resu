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
  name: Yup.string().required('Certification name is required'),
  issuer: Yup.string().required('Issuing organization is required'),
  date: Yup.date().required('Date is required'),
  expiryDate: Yup.date().min(
    Yup.ref('date'),
    'Expiry date must be after issue date'
  ),
  credentialId: Yup.string(),
  credentialUrl: Yup.string().url('Invalid URL'),
});

const CertificationsForm = ({ data, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [certifications, setCertifications] = useState(data || []);
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
      credentialUrl: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const newCertification = {
          ...values,
          id: Date.now().toString(),
        };
        await axios.post('/api/resumes/certifications', newCertification);
        setCertifications([...certifications, newCertification]);
        resetForm();
        setShowForm(false);
        toast.success('Certification added successfully');
      } catch (error) {
        toast.error('Failed to add certification');
        console.error('Error adding certification:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/resumes/certifications/${id}`);
      setCertifications(certifications.filter((cert) => cert.id !== id));
      toast.success('Certification deleted successfully');
    } catch (error) {
      toast.error('Failed to delete certification');
      console.error('Error deleting certification:', error);
    }
  };

  const handleContinue = async () => {
    try {
      await axios.put('/api/resumes/certifications', certifications);
      onNext();
    } catch (error) {
      toast.error('Failed to save certifications');
      console.error('Error saving certifications:', error);
    }
  };

  return (
    <Paper elevation={2} className="p-6">
      <Typography variant="h5" component="h2" className="mb-4">
        Certifications
      </Typography>

      <List>
        {certifications.map((certification) => (
          <ListItem key={certification.id} divider>
            <ListItemText
              primary={certification.name}
              secondary={
                <>
                  <Typography component="span" variant="body2">
                    Issued by {certification.issuer}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textSecondary">
                    {certification.date} - {certification.expiryDate || 'No Expiry'}
                  </Typography>
                  {certification.credentialId && (
                    <>
                      <br />
                      <Typography component="span" variant="body2" color="textSecondary">
                        Credential ID: {certification.credentialId}
                      </Typography>
                    </>
                  )}
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(certification.id)}
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
            Add Certification
          </Button>
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Certification Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="issuer"
                name="issuer"
                label="Issuing Organization"
                value={formik.values.issuer}
                onChange={formik.handleChange}
                error={formik.touched.issuer && Boolean(formik.errors.issuer)}
                helperText={formik.touched.issuer && formik.errors.issuer}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="date"
                name="date"
                label="Issue Date"
                type="date"
                value={formik.values.date}
                onChange={formik.handleChange}
                error={formik.touched.date && Boolean(formik.errors.date)}
                helperText={formik.touched.date && formik.errors.date}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="expiryDate"
                name="expiryDate"
                label="Expiry Date"
                type="date"
                value={formik.values.expiryDate}
                onChange={formik.handleChange}
                error={formik.touched.expiryDate && Boolean(formik.errors.expiryDate)}
                helperText={formik.touched.expiryDate && formik.errors.expiryDate}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="credentialId"
                name="credentialId"
                label="Credential ID"
                value={formik.values.credentialId}
                onChange={formik.handleChange}
                error={formik.touched.credentialId && Boolean(formik.errors.credentialId)}
                helperText={formik.touched.credentialId && formik.errors.credentialId}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="credentialUrl"
                name="credentialUrl"
                label="Credential URL"
                value={formik.values.credentialUrl}
                onChange={formik.handleChange}
                error={formik.touched.credentialUrl && Boolean(formik.errors.credentialUrl)}
                helperText={formik.touched.credentialUrl && formik.errors.credentialUrl}
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
                  {loading ? 'Adding...' : 'Add Certification'}
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
          disabled={loading || certifications.length === 0}
        >
          Save & Continue
        </Button>
      </Box>
    </Paper>
  );
};

export default CertificationsForm; 