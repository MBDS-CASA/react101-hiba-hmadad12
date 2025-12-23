import { Routes, Route, Navigate } from "react-router-dom";
import NotesTable from "./NotesTable";
import EtudiantsTable from "./EtudiantsTable";
import MatieresTable from "./MatieresTable";
import AProposContent from "./AProposContent";
import Home from "./Home";

function Menu() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NotesTable />} />
        <Route path="/etudiants" element={<EtudiantsTable />} />
        <Route path="/matieres" element={<MatieresTable />} />
        <Route path="/apropos" element={<AProposContent />} />
      </Routes>
    </main>
  );
}

export default Menu;