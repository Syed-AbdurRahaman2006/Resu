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
  name: Yup.string().required('Project name is required'),
  description: Yup.string()
    .required('Project description is required')
    .min(50, 'Description must be at least 50 characters'),
  startDate: Yup.date().required('Start date is required'),
  endDate: Yup.date().min(
    Yup.ref('startDate'),
    'End date must be after start date'
  ),
  current: Yup.boolean(),
  technologies: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one technology is required')
    .required('Technologies are required'),
  url: Yup.string().url('Invalid URL'),
  githubUrl: Yup.string().url('Invalid GitHub URL'),
});

const ProjectsForm = ({ data, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState(data || []);
  const [showForm, setShowForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      current: false,
      technologies: [],
      url: '',
      githubUrl: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const newProject = {
          ...values,
          id: Date.now().toString(),
        };
        await axios.post('/api/resumes/projects', newProject);
        setProjects([...projects, newProject]);
        resetForm();
        setShowForm(false);
        toast.success('Project added successfully');
      } catch (error) {
        toast.error('Failed to add project');
        console.error('Error adding project:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/resumes/projects/${id}`);
      setProjects(projects.filter((project) => project.id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project');
      console.error('Error deleting project:', error);
    }
  };

  const handleContinue = async () => {
    try {
      await axios.put('/api/resumes/projects', projects);
      onNext();
    } catch (error) {
      toast.error('Failed to save projects');
      console.error('Error saving projects:', error);
    }
  };

  return (
    <Paper elevation={2} className="p-6">
      <Typography variant="h5" component="h2" className="mb-4">
        Projects
      </Typography>

      <List>
        {projects.map((project) => (
          <ListItem key={project.id} divider>
            <ListItemText
              primary={project.name}
              secondary={
                <>
                  <Typography component="span" variant="body2">
                    {project.description}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textSecondary">
                    {project.startDate} - {project.current ? 'Present' : project.endDate}
                  </Typography>
                  <br />
                  <Typography component="span" variant="body2" color="textSecondary">
                    Technologies: {project.technologies.join(', ')}
                  </Typography>
                </>
              }
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDelete(project.id)}
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
            Add Project
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
                label="Project Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Project Description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
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
                id="technologies"
                name="technologies"
                label="Technologies Used"
                value={formik.values.technologies.join(', ')}
                onChange={(e) => {
                  const technologies = e.target.value
                    .split(',')
                    .map((tech) => tech.trim())
                    .filter(Boolean);
                  formik.setFieldValue('technologies', technologies);
                }}
                error={formik.touched.technologies && Boolean(formik.errors.technologies)}
                helperText={
                  (formik.touched.technologies && formik.errors.technologies) ||
                  'Separate technologies with commas'
                }
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="url"
                name="url"
                label="Project URL"
                value={formik.values.url}
                onChange={formik.handleChange}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="githubUrl"
                name="githubUrl"
                label="GitHub Repository URL"
                value={formik.values.githubUrl}
                onChange={formik.handleChange}
                error={formik.touched.githubUrl && Boolean(formik.errors.githubUrl)}
                helperText={formik.touched.githubUrl && formik.errors.githubUrl}
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
                  {loading ? 'Adding...' : 'Add Project'}
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
          disabled={loading || projects.length === 0}
        >
          Save & Continue
        </Button>
      </Box>
    </Paper>
  );
};

export default ProjectsForm; 