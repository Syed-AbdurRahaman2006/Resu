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
  title: Yup.string().required('Title is required'),
  description: Yup.string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
});

const AdditionalInfoForm = ({ data, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState(data || []);
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const newInfo = {
          ...values,
          id: Date.now().toString(),
        };
        await axios.post('/api/resumes/additional-info', newInfo);
        setAdditionalInfo([...additionalInfo, newInfo]);
        resetForm();
        setShowForm(false);
        toast.success('Additional information added successfully');
      } catch (error) {
        toast.error('Failed to add additional information');
        console.error('Error adding additional information:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/resumes/additional-info/${id}`);
      setAdditionalInfo(additionalInfo.filter((info) => info.id !== id));
      toast.success('Additional information deleted successfully');
    } catch (error) {
      toast.error('Failed to delete additional information');
      console.error('Error deleting additional information:', error);
    }
  };

  const handleContinue = async () => {
    try {
      await axios.put('/api/resumes/additional-info', additionalInfo);
      onNext();
    } catch (error) {
      toast.error('Failed to save additional information');
      console.error('Error saving additional information:', error);
    }
  };

  return (
    <Paper elevation={2} className="p-6">
      <Typography variant="h5" component="h2" className="mb-4">
        Additional Information
      </Typography>

      <List>
        {additionalInfo.map((info) => (
          <ListItem key={info.id} divider>
            <ListItemText
              primary={info.title}
              secondary={info.description}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(info.id)}
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
            Add Information
          </Button>
        </Box>
      ) : (
        <form onSubmit={formik.handleSubmit} className="mt-4">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
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
                  {loading ? 'Adding...' : 'Add Information'}
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
          disabled={loading}
        >
          Save & Continue
        </Button>
      </Box>
    </Paper>
  );
};

export default AdditionalInfoForm; 