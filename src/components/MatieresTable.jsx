import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from '../data/data.json';

function MatieresTable() {
  // Extraire la liste unique des matières avec statistiques
  const courses = {};
  
  data.forEach(note => {
    if (!courses[note.course]) {
      courses[note.course] = {
        name: note.course,
        count: 0,
        totalGrade: 0
      };
    }
    courses[note.course].count++;
    courses[note.course].totalGrade += note.grade;
  });

  const coursesList = Object.values(courses).map(course => ({
    name: course.name,
    count: course.count,
    average: (course.totalGrade / course.count).toFixed(2)
  }));

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto' }}>
      <Table sx={{ minWidth: 500 }} aria-label="matieres table">
        <TableHead>
          <TableRow>
            <TableCell>Matière</TableCell>
            <TableCell align="right">Nombre de notes</TableCell>
            <TableCell align="right">Moyenne</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coursesList.map((course, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {course.name}
              </TableCell>
              <TableCell align="right">{course.count}</TableCell>
              <TableCell align="right">{course.average}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MatieresTable;