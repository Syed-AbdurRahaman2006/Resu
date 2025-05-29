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
  Chip,
  IconButton,
  Autocomplete,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const validationSchema = Yup.object({
  category: Yup.string().required('Category is required'),
  skills: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one skill is required')
    .required('Skills are required'),
});

const skillCategories = [
  'Programming Languages',
  'Frameworks & Libraries',
  'Databases',
  'Tools & Technologies',
  'Soft Skills',
  'Languages',
  'Other',
];

const SkillsForm = ({ data, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [skillCategories, setSkillCategories] = useState(data || []);

  const formik = useFormik({
    initialValues: {
      category: '',
      skills: [],
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const newCategory = {
          ...values,
          id: Date.now().toString(),
        };
        await axios.post('/api/resumes/skills', newCategory);
        setSkillCategories([...skillCategories, newCategory]);
        resetForm();
        toast.success('Skills added successfully');
      } catch (error) {
        toast.error('Failed to add skills');
        console.error('Error adding skills:', error);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/resumes/skills/${id}`);
      setSkillCategories(skillCategories.filter((cat) => cat.id !== id));
      toast.success('Skill category deleted successfully');
    } catch (error) {
      toast.error('Failed to delete skill category');
      console.error('Error deleting skill category:', error);
    }
  };

  const handleContinue = async () => {
    try {
      await axios.put('/api/resumes/skills', skillCategories);
      onNext();
    } catch (error) {
      toast.error('Failed to save skills');
      console.error('Error saving skills:', error);
    }
  };

  return (
    <Paper elevation={2} className="p-6">
      <Typography variant="h5" component="h2" className="mb-4">
        Skills
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Autocomplete
              id="category"
              options={skillCategories}
              value={formik.values.category}
              onChange={(event, newValue) => {
                formik.setFieldValue('category', newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skill Category"
                  error={formik.touched.category && Boolean(formik.errors.category)}
                  helperText={formik.touched.category && formik.errors.category}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="skills"
              options={[]}
              freeSolo
              value={formik.values.skills}
              onChange={(event, newValue) => {
                formik.setFieldValue('skills', newValue);
              }}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    onDelete={() => {
                      const newSkills = [...formik.values.skills];
                      newSkills.splice(index, 1);
                      formik.setFieldValue('skills', newSkills);
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Skills"
                  placeholder="Add skills and press Enter"
                  error={formik.touched.skills && Boolean(formik.errors.skills)}
                  helperText={formik.touched.skills && formik.errors.skills}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Box className="flex justify-end">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Skills'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>

      <Box className="mt-6">
        {skillCategories.map((category) => (
          <Box key={category.id} className="mb-4">
            <Typography variant="h6" className="mb-2">
              {category.category}
            </Typography>
            <Box className="flex flex-wrap gap-2">
              {category.skills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => {
                    const newSkills = [...category.skills];
                    newSkills.splice(index, 1);
                    const newCategories = skillCategories.map((cat) =>
                      cat.id === category.id
                        ? { ...cat, skills: newSkills }
                        : cat
                    );
                    setSkillCategories(newCategories);
                  }}
                />
              ))}
            </Box>
            <IconButton
              size="small"
              onClick={() => handleDelete(category.id)}
              className="mt-2"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>

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
          disabled={loading || skillCategories.length === 0}
        >
          Save & Continue
        </Button>
      </Box>
    </Paper>
  );
};

export default SkillsForm; 