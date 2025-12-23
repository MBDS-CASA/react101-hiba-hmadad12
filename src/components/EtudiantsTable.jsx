import * as React from 'react';
import { useState, useMemo, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import data from '../data/data.json';
import Modal from './Modal';

function EtudiantsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
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
  const sortedData = useMemo(() => {
    let sortableData = [...students];
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableData;
  }, [sortConfig, students]);

  // Fonction de recherche
  const filteredData = sortedData.filter(student => {
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
  const handleSort = key => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Gestion de la pagination
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const SortIcon = ({ column }) => {
    if (sortConfig.key !== column) return <ArrowUpwardIcon style={{ opacity: 0.3, fontSize: 18 }} />;
    return sortConfig.direction === 'asc' ? (
      <ArrowUpwardIcon style={{ fontSize: 18, color: '#61dafb' }} />
    ) : (
      <ArrowDownwardIcon style={{ fontSize: 18, color: '#61dafb' }} />
    );
  };

  const handleOpenModal = student => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedStudent(null);
  };

  const getStudentCourses = () => {
    if (!selectedStudent) return [];
    return data
      .filter(row => row.student.id === selectedStudent.id)
      .map(row => ({
        course: row.course,
        grade: row.grade,
        date: row.date,
      }))
      .sort((a, b) => a.course.localeCompare(b.course));
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
          onChange={e => setSearchTerm(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: '#e0e0e0',
              '& fieldset': { borderColor: 'rgba(97, 218, 251, 0.3)' },
              '&:hover fieldset': { borderColor: 'rgba(97, 218, 251, 0.5)' },
              '&.Mui-focused fieldset': { borderColor: '#61dafb' },
            },
            '& .MuiInputBase-input': { color: '#e0e0e0' },
          }}
        />
      </div>

      {/* Tableau */}
      <TableContainer component={Paper} sx={{ maxWidth: 800, margin: 'auto' }}>
        <Table sx={{ minWidth: 500 }} aria-label="etudiants table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => handleSort('id')}>
                <div className="sortable-header">ID <SortIcon column="id" /></div>
              </TableCell>
              <TableCell onClick={() => handleSort('firstname')}>
                <div className="sortable-header">Prénom <SortIcon column="firstname" /></div>
              </TableCell>
              <TableCell onClick={() => handleSort('lastname')}>
                <div className="sortable-header">Nom <SortIcon column="lastname" /></div>
              </TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="no-results">
                  Aucun résultat trouvé
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map(student => (
                <TableRow key={student.id}>
                  <TableCell component="th" scope="row">{student.id}</TableCell>
                  <TableCell>{student.firstname}</TableCell>
                  <TableCell>{student.lastname}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleOpenModal(student)}
                      sx={{
                        backgroundColor: '#61dafb',
                        color: '#000',
                        '&:hover': { backgroundColor: '#4aa8cc' },
                      }}
                    >
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        title={
          selectedStudent
            ? `Matières de ${selectedStudent.firstname} ${selectedStudent.lastname}`
            : 'Détails'
        }
        data={getStudentCourses()}
        columns={[
          { key: 'course', label: 'Matière' },
          { key: 'grade', label: 'Note' },
          { key: 'date', label: 'Date' },
        ]}
      />

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
        Affichage de {startIndex + 1} à {Math.min(startIndex + rowsPerPage, filteredData.length)} sur{' '}
        {filteredData.length} résultat(s)
      </p>
    </div>
  );
}

export default EtudiantsTable;
