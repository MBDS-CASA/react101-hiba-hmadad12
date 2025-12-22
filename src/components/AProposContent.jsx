import React from 'react';
import { Paper, Typography } from '@mui/material';

function AProposContent() {
  return (
    <Paper sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        À propos
      </Typography>
      <Typography variant="body1" paragraph>
        Application de gestion des notes développée avec React et Material UI.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        TD04-05 : Introduction à React
      </Typography>
    </Paper>
  );
}

export default AProposContent;