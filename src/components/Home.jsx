import React, { useState, useEffect } from 'react'

function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const jours = ["Dimanche","Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi"];
  const mois = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

  const jour = jours[currentTime.getDay()];
  const moisNom = mois[currentTime.getMonth()];
  const annee = currentTime.getFullYear();
  const heure = String(currentTime.getHours()).padStart(2, '0');
  const minute = String(currentTime.getMinutes()).padStart(2, '0');
  const seconde = String(currentTime.getSeconds()).padStart(2, '0');

  return (
    <div className="home-container">
      <h1>Bienvenue</h1>
      <p style={{ 
        color: '#888', 
        background: 'rgba(97, 218, 251, 0.05)',
        border: '1px solid rgba(97, 218, 251, 0.1)',
        borderRadius: '8px',
        padding: '15px 20px',
        fontSize: '16px',
        marginTop: '20px'
      }}>
        Bonjour c'est le {jour} {currentTime.getDate()} {moisNom} {annee} il est {heure}:{minute}:{seconde}
      </p>
    </div>
  )
}

export default Home
