import React from 'react';
import { Paper, Typography } from '@mui/material';

function AProposContent() {
  return (
    <div className="content-fade-in">
      <Paper sx={{ 
        maxWidth: 800, 
        margin: 'auto', 
        padding: 4,
        background: 'linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%)',
        border: '1px solid rgba(97, 218, 251, 0.1)'
      }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#61dafb', fontWeight: 600 }}>
          À propos
        </Typography>
        
        <Typography variant="body1" paragraph sx={{ color: '#e0e0e0', lineHeight: 1.8 }}>
          Application de gestion des notes développée avec React et Material UI dans le cadre du TD04-05.
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ color: '#61dafb', marginTop: 3 }}>
          Fonctionnalités
        </Typography>
        
        <Typography variant="body1" component="div" sx={{ color: '#e0e0e0', lineHeight: 1.8 }}>
          <ul style={{ marginLeft: '20px' }}>
            <li>Menu dynamique avec navigation fluide</li>
            <li>Affichage des notes, étudiants et matières</li>
            <li>Recherche en temps réel</li>
            <li>Tri croissant/décroissant sur toutes les colonnes</li>
            <li>Pagination pour une meilleure navigation</li>
            <li>Animations et transitions</li>
            <li>Design moderne et responsive</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ color: '#61dafb', marginTop: 3 }}>
          Technologies utilisées
        </Typography>
        
        <Typography variant="body1" component="div" sx={{ color: '#e0e0e0', lineHeight: 1.8 }}>
          <ul style={{ marginLeft: '20px' }}>
            <li>React 18</li>
            <li>Material UI</li>
            <li>CSS3 avec animations</li>
            <li>JavaScript ES6+</li>
          </ul>
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 4, fontStyle: 'italic', color: '#888' }}>
          TD04-05 : Introduction à React - 2025
        </Typography>
      </Paper>
    </div>
  );
}

export default AProposContent;