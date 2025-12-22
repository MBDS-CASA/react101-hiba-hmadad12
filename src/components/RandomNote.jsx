import React, { useState } from "react";
import data from "../../data.json"; // import du fichier JSON

// Fonction pour choisir un élément aléatoire
function getRandomItem(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

// Composant pour afficher un élément
function NoteCard({ note }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "20px",
      margin: "20px auto",
      width: "300px",
      borderRadius: "8px",
      boxShadow: "2px 2px 12px rgba(0,0,0,0.1)"
    }}>
      <h3>{note.course}</h3>
      <p><strong>Étudiant :</strong> {note.student.firstname} {note.student.lastname} (ID: {note.student.id})</p>
      <p><strong>Date :</strong> {note.date}</p>
      <p><strong>Note :</strong> {note.grade}</p>
    </div>
  );
}

export default function RandomNote() {
  const [randomNote, setRandomNote] = useState(getRandomItem(data));

  return (
    <div style={{ textAlign: "center" }}>
      <h1>TD03 : Détails d'une note aléatoire</h1>
      <NoteCard note={randomNote} />
      <button onClick={() => setRandomNote(getRandomItem(data))}>
        Afficher une autre note aléatoire
      </button>
    </div>
  );
}