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

function NotesTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const rowsPerPage = 10;

  // Fonction de tri
  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue = sortConfig.key === 'student' 
          ? `${a.student.firstname} ${a.student.lastname}`
          : sortConfig.key === 'studentId'
          ? a.student.id
          : a[sortConfig.key];
        
        let bValue = sortConfig.key === 'student'
          ? `${b.student.firstname} ${b.student.lastname}`
          : sortConfig.key === 'studentId'
          ? b.student.id
          : b[sortConfig.key];

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
  }, [sortConfig]);

  // Fonction de recherche
  const filteredData = sortedData.filter((row) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      row.course.toLowerCase().includes(searchLower) ||
      row.student.firstname.toLowerCase().includes(searchLower) ||
      row.student.lastname.toLowerCase().includes(searchLower) ||
      row.student.id.toString().includes(searchLower) ||
      row.date.includes(searchLower) ||
      row.grade.toString().includes(searchLower)
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

  // Reset la page lors d'une recherche
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
          placeholder="Rechercher par cours, étudiant, ID, date ou note..."
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
            '& .MuiInputBase-input::placeholder': {
              color: '#666',
              opacity: 1,
            },
          }}
        />
      </div>

      {/* Tableau */}
      <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: 'auto' }}>
        <Table sx={{ minWidth: 650 }} aria-label="notes table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('course')}>
                <div className="sortable-header">
                  Cours
                  <SortIcon column="course" />
                </div>
              </TableCell>
              <TableCell onClick={() => handleSort('student')}>
                <div className="sortable-header">
                  Étudiant
                  <SortIcon column="student" />
                </div>
              </TableCell>
              <TableCell onClick={() => handleSort('studentId')}>
                <div className="sortable-header">
                  ID
                  <SortIcon column="studentId" />
                </div>
              </TableCell>
              <TableCell onClick={() => handleSort('date')}>
                <div className="sortable-header">
                  Date
                  <SortIcon column="date" />
                </div>
              </TableCell>
              <TableCell align="right" onClick={() => handleSort('grade')}>
                <div className="sortable-header">
                  Note
                  <SortIcon column="grade" />
                </div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="no-results">
                  Aucun résultat trouvé
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row) => (
                <TableRow key={row.unique_id}>
                  <TableCell component="th" scope="row">
                    {row.course}
                  </TableCell>
                  <TableCell>{row.student.firstname} {row.student.lastname}</TableCell>
                  <TableCell>{row.student.id}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell align="right">{row.grade}</TableCell>
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

      {/* Statistiques */}
      <p style={{ textAlign: 'center', color: '#888', marginTop: '20px', fontSize: '14px' }}>
        Affichage de {startIndex + 1} à {Math.min(startIndex + rowsPerPage, filteredData.length)} sur {filteredData.length} résultat(s)
      </p>
    </div>
  );
}

export default NotesTable;