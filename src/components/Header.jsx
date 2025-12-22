import React, { useState } from 'react';

function Header() {
  const menuItems = ["Notes", "Etudiants", "Matières", "A propos"];

  const handleClick = (item) => {
    alert(`Vous avez cliqué sur : ${item}`);
  };

  return (
    <header style={{ 
      position: 'relative',
      padding: '20px',
      borderBottom: '1px solid #444',
      backgroundColor: '#1a1a1a'
    }}>
      
      {/* Menu en haut à gauche - position absolue */}
      <nav style={{ position: 'absolute', left: '20px', top: '20px' }}>
        <ul style={{ 
          display: 'flex', 
          gap: '20px', 
          listStyle: 'none', 
          margin: 0, 
          padding: 0 
        }}>
          {menuItems.map((item) => (
            <li
              key={item}
              style={{ 
                cursor: 'pointer', 
                fontWeight: '500',
                color: '#e0e0e0',
                fontSize: '16px'
              }}
              onClick={() => handleClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logo et titre - centré */}
      <div style={{ textAlign: 'center', color: 'white' }}>
        <svg width="80" height="80" viewBox="0 0 100 100" style={{ margin: '0 auto' }}>
          <circle cx="50" cy="50" r="8" fill="#61dafb"/>
          <ellipse cx="50" cy="50" rx="35" ry="15" fill="none" stroke="#61dafb" strokeWidth="2"/>
          <ellipse cx="50" cy="50" rx="35" ry="15" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(60 50 50)"/>
          <ellipse cx="50" cy="50" rx="35" ry="15" fill="none" stroke="#61dafb" strokeWidth="2" transform="rotate(120 50 50)"/>
        </svg>
        <h1 style={{ margin: '20px 0 10px', fontSize: '48px', fontWeight: 'bold' }}>
          Introduction à React
        </h1>
        <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '300', color: '#b0b0b0' }}>
          A la découverte des premières notions de React
        </h2>
      </div>
    </header>
  );
}

// Fonction pour choisir un élément aléatoire
function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Données de démonstration
const data = [
  {
    course: "Chemistry 606",
    student: { firstname: "Susan", lastname: "Price", id: 9285 },
    date: "2023-04-11",
    grade: 93
  },
  {
    course: "Mathematics 301",
    student: { firstname: "John", lastname: "Doe", id: 1234 },
    date: "2023-05-15",
    grade: 87
  },
  {
    course: "Physics 202",
    student: { firstname: "Marie", lastname: "Curie", id: 5678 },
    date: "2023-06-20",
    grade: 95
  }
];

// Composant pour afficher une note
function NoteCard({ note }) {
  return (
    <div style={{
      border: "1px solid #444",
      backgroundColor: '#2a2a2a',
      padding: "30px",
      margin: "30px auto",
      maxWidth: "400px",
      borderRadius: "12px",
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      color: 'white'
    }}>
      <h3 style={{ 
        fontSize: '24px', 
        marginBottom: '20px',
        color: '#61dafb'
      }}>
        {note.course}
      </h3>
      <p style={{ marginBottom: '10px' }}>
        <strong>Étudiant :</strong> {note.student.firstname} {note.student.lastname} (ID: {note.student.id})
      </p>
      <p style={{ marginBottom: '10px' }}>
        <strong>Date :</strong> {note.date}
      </p>
      <p style={{ fontSize: '18px', marginTop: '15px' }}>
        <strong>Note :</strong> {note.grade}
      </p>
    </div>
  );
}

// Composant Date en temps réel
function DateDisplay() {
  const [date, setDate] = useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  const jours = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

  const jourSemaine = jours[date.getDay()];
  const numeroJour = date.getDate();
  const moisActuel = mois[date.getMonth()];
  const annee = date.getFullYear();
  const heure = date.getHours().toString().padStart(2, '0');
  const minute = date.getMinutes().toString().padStart(2, '0');
  const seconde = date.getSeconds().toString().padStart(2, '0');

  return (
    <p style={{ 
      textAlign: 'center', 
      color: '#888', 
      fontSize: '14px',
      margin: '20px 0'
    }}>
      Bonjour, on est le {jourSemaine} {numeroJour} {moisActuel} {annee} et il est {heure}:{minute}:{seconde}
    </p>
  );
}

function RandomNote() {
  const [randomNote, setRandomNote] = useState(getRandomItem(data));

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <DateDisplay />
      <h1 style={{ 
        fontSize: '36px', 
        margin: '30px 0',
        color: 'white'
      }}>
        TD03 : Détails d'une note aléatoire
      </h1>
      <NoteCard note={randomNote} />
      <button 
        onClick={() => setRandomNote(getRandomItem(data))}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#61dafb',
          color: '#1a1a1a',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginTop: '20px'
        }}
      >
        Afficher une autre note aléatoire
      </button>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#1a1a1a',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <Header />
      <RandomNote />
    </div>
  );
}