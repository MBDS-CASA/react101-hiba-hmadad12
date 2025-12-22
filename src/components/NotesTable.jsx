import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import data from '../data/data.json';

function NotesTable() {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: 'auto' }}>
      <Table sx={{ minWidth: 650 }} aria-label="notes table">
        <TableHead>
          <TableRow>
            <TableCell>Cours</TableCell>
            <TableCell>Étudiant</TableCell>
            <TableCell>ID Étudiant</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="right">Note</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.course}
              </TableCell>
              <TableCell>{row.student.firstname} {row.student.lastname}</TableCell>
              <TableCell>{row.student.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell align="right">{row.grade}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default NotesTable;