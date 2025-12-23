import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Modal({ open, onClose, title, data, columns }) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: '#1e1e1e',
          color: '#e0e0e0'
        }
      }}
    >
      <DialogTitle style={{ color: '#61dafb', fontWeight: 'bold' }}>
        {title}
      </DialogTitle>
      <DialogContent>
        {Array.isArray(data) && data.length > 0 ? (
          <TableContainer component={Paper} style={{ marginTop: '16px', backgroundColor: '#2a2a2a' }}>
            <Table size="small">
              <TableHead>
                <TableRow style={{ backgroundColor: '#333' }}>
                  {columns.map((column) => (
                    <TableCell 
                      key={column.key}
                      style={{ color: '#61dafb', fontWeight: 'bold' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index} style={{ borderBottom: '1px solid #444' }}>
                    {columns.map((column) => (
                      <TableCell key={column.key} style={{ color: '#e0e0e0' }}>
                        {column.format 
                          ? column.format(row[column.key]) 
                          : row[column.key]
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p style={{ color: '#888', marginTop: '16px' }}>Aucune donnée disponible</p>
        )}
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onClose}
          style={{ color: '#61dafb' }}
        >
          Fermer
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Modal;
