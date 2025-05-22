import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import Stats from './components/Stats';
import { useDispatch } from 'react-redux';
import { addEmployee, updateEmployee, fetchEmployees } from './features/employeeSlice';

const App = () => {
  const [openForm, setOpenForm] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const dispatch = useDispatch();

  const handleOpenForm = () => {
    setEditEmployee(null);
    setOpenForm(true);
  };

  const handleCloseForm = () => setOpenForm(false);

const handleSave = async (formData) => {
  try {
    if (editEmployee) {
      await dispatch(updateEmployee({ id: editEmployee.id, employeeData: formData })).unwrap();
    } else {
      await dispatch(addEmployee(formData)).unwrap();
    }
    setOpenForm(false);
    dispatch(fetchEmployees(1));
  } catch (error) {
    console.error('Save failed:', error);
  }
};

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setOpenForm(true);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Employee Management</Typography>
      <Box sx={{ mb: 2 }}>
        <Button variant="contained" onClick={handleOpenForm}>Add Employee</Button>
      </Box>

      <EmployeeList onEdit={handleEdit} />

      <Box sx={{ mt: 4 }}>
        <Stats />
      </Box>

      <EmployeeForm open={openForm} onClose={handleCloseForm} onSave={handleSave} editData={editEmployee} />
    </Container>
  );
};

export default App;
