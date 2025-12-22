import { useState, useEffect } from 'react';

function MainContent() {
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
    <main style={{ textAlign: 'center', margin: '20px 0' }}>
      <p>
      Bonjour, on est le {jour}, {mois}, {annee} et il est {heure}:{minute}:{seconde}
      </p>
    </main>
  );
}

export default MainContent;
