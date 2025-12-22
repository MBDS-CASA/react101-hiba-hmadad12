import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import data from '../data/data.json';

function EtudiantsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const rowsPerPage = 10;

  // Extraire la liste unique des étudiants
  const students = [];
  const studentIds = new Set();
  
  data.forEach(note => {
    if (!studentIds.has(note.student.id)) {
      studentIds.add(note.student.id);
      students.push(note.student);
    }
  });

  // Fonction de tri
  const sortedData = React.useMemo(() => {
    let sortableData = [...students];
    
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableData;
  }, [sortConfig, students]);

  // Fonction de recherche
  const filteredData = sortedData.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.id.toString().includes(searchLower) ||
      student.firstname.toLowerCase().includes(searchLower) ||
      student.lastname.toLowerCase().includes(searchLower)
    );
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);

  // Gestion du tri
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Gestion de la pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ArrowUpwardIcon style={{ opacity: 0.3, fontSize: 18 }} />;
    return sortConfig.direction === 'asc' 
      ? <ArrowUpwardIcon style={{ fontSize: 18, color: '#61dafb' }} />
      : <ArrowDownwardIcon style={{ fontSize: 18, color: '#61dafb' }} />;
  };

  return (
    <div className="content-fade-in">
      {/* Barre de recherche */}
      <div className="search-bar">
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher par ID, prénom ou nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#e0e0e0',
              '& fieldset': {
                borderColor: 'rgba(97, 218, 251, 0.3)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(97, 218, 251, 0.5)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#61dafb',
              },
            },
            '& .MuiInputBase-input': {
              color: '#e0e0e0',
            },
          }}
        />
      </div>

      {/* Tableau */}
      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto' }}>
        <Table sx={{ minWidth: 500 }} aria-label="etudiants table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('id')}>
                <div className="sortable-header">
                  ID
                  <SortIcon column="id" />
                </div>
              </TableCell>
              <TableCell onClick={() => handleSort('firstname')}>
                <div className="sortable-header">
                  Prénom
                  <SortIcon column="firstname" />
                </div>
              </TableCell>
              <TableCell onClick={() => handleSort('lastname')}>
                <div className="sortable-header">
                  Nom
                  <SortIcon column="lastname" />
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="no-results">
                  Aucun résultat trouvé
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((student) => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">
                    {student.id}
                  </TableCell>
                  <TableCell>{student.firstname}</TableCell>
                  <TableCell>{student.lastname}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {filteredData.length > 0 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          sx={{ marginTop: '30px' }}
        />
      )}

      <p style={{ textAlign: 'center', color: '#888', marginTop: '20px', fontSize: '14px' }}>
        Affichage de {startIndex + 1} à {Math.min(startIndex + rowsPerPage, filteredData.length)} sur {filteredData.length} résultat(s)
      </p>
    </div>
  );
}

export default EtudiantsTable;