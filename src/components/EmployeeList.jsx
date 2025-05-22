import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, deleteEmployee } from '../features/employeeSlice';
import Pagination from './Pagination';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const EmployeeList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { list, loading, totalPages, currentPage } = useSelector(state => state.employees);

  console.log("list",list, loading, totalPages, currentPage)

  useEffect(() => {
    dispatch(fetchEmployees(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this employee?')) {
      dispatch(deleteEmployee(id));
    }
  };

  const handlePageChange = (page) => {
    dispatch(fetchEmployees(page));
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Photo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list?.data?.map(emp => (
              <TableRow key={emp.id}>
                <TableCell>
                  {emp.photo ? <img src={`http://localhost:5000/uploads/${emp.photo}`} alt={emp.name} width={50} /> : 'No Photo'}
                </TableCell>
                <TableCell>{emp.name}</TableCell>
                <TableCell>{emp.department_name || emp.department}</TableCell>
                <TableCell>{emp.dob}</TableCell>
                <TableCell>{emp.phone}</TableCell>
                <TableCell>{emp.email}</TableCell>
                <TableCell>{emp.salary}</TableCell>
                <TableCell>{emp.status ? 'Active' : 'Inactive'}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(emp)}><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(emp.id)}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination page={currentPage} totalPages={totalPages} onChange={handlePageChange} />
    </>
  );
};

export default EmployeeList;
