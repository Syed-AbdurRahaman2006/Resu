import React from 'react';
import { Dialog, DialogTitle, DialogContent, Grid, Card, CardActionArea, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// Example templates (replace with real data or fetch from backend if needed)
const templates = [
  {
    id: 'classic',
    name: 'Classic',
    img: '/templates/classic.png',
  },
  {
    id: 'modern',
    name: 'Modern',
    img: '/templates/modern.png',
  },
  {
    id: 'creative',
    name: 'Creative',
    img: '/templates/creative.png',
  },
];

const TemplateModal = ({ open, onClose, onSelectTemplate }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Select a Resume Template
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {templates.map((template) => (
            <Grid item xs={12} sm={6} md={4} key={template.id}>
              <Card>
                <CardActionArea onClick={() => onSelectTemplate(template)}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={template.img}
                    alt={template.name}
                  />
                  <CardContent>
                    <Typography variant="h6" align="center">
                      {template.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateModal; 