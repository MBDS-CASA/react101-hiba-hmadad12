import { useState, useEffect } from 'react';
import NotesTable from './NotesTable.jsx';
import EtudiantsTable from './EtudiantsTable.jsx';
import MatieresTable from './MatieresTable.jsx';
import AProposContent from './AProposContent.jsx';

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
        return <NotesTable key="notes" />;
      case "Etudiants":
        return <EtudiantsTable key="etudiants" />;
      case "Matières":
        return <MatieresTable key="matieres" />;
      case "A propos":
        return <AProposContent key="apropos" />;
      default:
        return <NotesTable key="notes" />;
    }
  };

  return (
    <main style={{ padding: '20px' }}>
      {/* Date centrée */}
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <p style={{ 
          color: '#888', 
          background: 'rgba(97, 218, 251, 0.05)',
          border: '1px solid rgba(97, 218, 251, 0.1)',
          borderRadius: '8px',
          padding: '12px 24px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          display: 'inline-block'
        }}>
          Bonjour, on est le {jour}, {moisNom}, {annee} et il est {heure}:{minute}:{seconde}
        </p>
      </div>
      
      {/* Contenu avec animation */}
      {renderContent()}
    </main>
  );
}

export default MainContent;