import React from 'react';
import { useState, useEffect } from 'react';

function Footer() {
  const annee = new Date().getFullYear(); 
  const prenom = "Hiba";
  const nom = "Hmadad";

  return (
    <footer style={{
      textAlign: 'center',
      marginTop: '40px',
      padding: '10px 0',
      borderTop: '1px solid #ccc'
    }}>
      © {annee} - {prenom}.{nom}, Tous droits réservés.
    </footer>
  );
}

export default Footer;