import { useState, useEffect } from 'react';
import RandomNote from './RandomNote.jsx';

function MainContent({ activeMenu }) {
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

  const renderContent = () => {
    switch(activeMenu) {
      case "Notes":
        return <RandomNote />;
      case "Etudiants":
        return <h2 style={{ color: 'white', padding: '40px' }}>Etudiants</h2>;
      case "Matières":
        return <h2 style={{ color: 'white', padding: '40px' }}>Matières</h2>;
      case "A propos":
        return <h2 style={{ color: 'white', padding: '40px' }}>A propos</h2>;
      default:
        return <RandomNote />;
    }
  };

  return (
    <main style={{ textAlign: 'center', margin: '20px 0' }}>
      <p style={{ color: '#888' }}>
        Bonjour, on est le {jour}, {moisNom}, {annee} et il est {heure}:{minute}:{seconde}
      </p>
      {renderContent()}
    </main>
  );
}

export default MainContent;