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

function MatieresTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const rowsPerPage = 10;

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
    average: parseFloat((course.totalGrade / course.count).toFixed(2))
  }));

  // Fonction de tri
  const sortedData = React.useMemo(() => {
    let sortableData = [...coursesList];
    
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
  }, [sortConfig, coursesList]);

  // Fonction de recherche
  const filteredData = sortedData.filter((course) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      course.name.toLowerCase().includes(searchLower) ||
      course.count.toString().includes(searchLower) ||
      course.average.toString().includes(searchLower)
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
          placeholder="Rechercher par matière, nombre de notes ou moyenne..."
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
        <Table sx={{ minWidth: 500 }} aria-label="matieres table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('name')}>
                <div className="sortable-header">
                  Matière
                  <SortIcon column="name" />
                </div>
              </TableCell>
              <TableCell align="right" onClick={() => handleSort('count')}>
                <div className="sortable-header">
                  Nombre de notes
                  <SortIcon column="count" />
                </div>
              </TableCell>
              <TableCell align="right" onClick={() => handleSort('average')}>
                <div className="sortable-header">
                  Moyenne
                  <SortIcon column="average" />
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
              paginatedData.map((course, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {course.name}
                  </TableCell>
                  <TableCell align="right">{course.count}</TableCell>
                  <TableCell align="right">{course.average}</TableCell>
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

export default MatieresTable;