import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from '../data/data.json';

function EtudiantsTable() {
  // Extraire la liste unique des étudiants
  const students = [];
  const studentIds = new Set();
  
  data.forEach(note => {
    if (!studentIds.has(note.student.id)) {
      studentIds.add(note.student.id);
      students.push(note.student);
    }
  });

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto' }}>
      <Table sx={{ minWidth: 500 }} aria-label="etudiants table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Prénom</TableCell>
            <TableCell>Nom</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student.id}
              </TableCell>
              <TableCell>{student.firstname}</TableCell>
              <TableCell>{student.lastname}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default EtudiantsTable;