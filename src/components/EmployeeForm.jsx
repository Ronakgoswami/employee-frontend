import React, { useState, useEffect } from 'react'; 
import { 
  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, 
  FormControlLabel, Switch, InputLabel, Select, MenuItem, 
  FormHelperText, FormControl, Box, Typography, Alert
} from '@mui/material'; 
import axios from 'axios'; 
 
const BASE_URL = 'http://localhost:5000/api'; 

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^\d{10}$/;
 
const EmployeeForm = ({ open, onClose, onSave, editData }) => { 
  const [departments, setDepartments] = useState([]); 
  const [form, setForm] = useState({ 
    name: '', 
    department_id: '', 
    dob: '', 
    phone: '', 
    photo: null, 
    email: '', 
    salary: '', 
    status: true, 
  });

  const [errors, setErrors] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [submitError, setSubmitError] = useState('');
 
  useEffect(() => { 
    axios.get(`${BASE_URL}/employees/departments`) 
      .then(res => setDepartments(res.data)) 
      .catch(err => {
        console.error("Failed to fetch departments:", err);
        setSubmitError("Failed to load departments. Please try again.");
      }); 
  }, []); 
 
  useEffect(() => { 
    setErrors({});
    setAttempted(false);
    setSubmitError('');
    
    if (editData) { 
      setForm({ 
        name: editData.name || '', 
        department_id: editData.department_id || '', 
        dob: editData.dob || '', 
        phone: editData.phone || '', 
        photo: null, 
        email: editData.email || '', 
        salary: editData.salary || '', 
        status: editData.status === 1, 
      }); 
    } else { 
      setForm({ 
        name: '', 
        department_id: '', 
        dob: '', 
        phone: '', 
        photo: null, 
        email: '', 
        salary: '', 
        status: true, 
      }); 
    } 
  }, [editData, open]); 
 
  const handleChange = (e) => { 
    const { name, value, type, checked, files } = e.target; 
    
    if (type === 'file') { 
      setForm(prev => ({ ...prev, photo: files[0] })); 
    } else if (type === 'checkbox') { 
      setForm(prev => ({ ...prev, [name]: checked })); 
    } else { 
      setForm(prev => ({ ...prev, [name]: value })); 
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  }; 

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!form.department_id) {
      newErrors.department_id = 'Please select a department';
    }
    
    if (!form.dob) {
      newErrors.dob = 'Date of birth is required';
    } else {
      const birthDate = new Date(form.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (age < 18 || age > 70) {
        newErrors.dob = 'Employee must be between 18 and 70 years old';
      }
    }
    
    if (!form.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!PHONE_REGEX.test(form.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    
    if (!form.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(form.salary) || Number(form.salary) <= 0) {
      newErrors.salary = 'Enter a valid salary amount';
    }
    
    if (!editData && !form.photo) {
      newErrors.photo = 'Please upload a photo';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = () => { 
    setAttempted(true);
    setSubmitError('');
    
    const isValid = validateForm();
    
    if (isValid) {
      try {
        const data = new FormData(); 
        for (const key in form) { 
          if (form[key] !== null) { 
            data.append(key, form[key]); 
          } 
        }
        
        onSave(data);
      } catch (error) {
        console.error("Error submitting form:", error);
        setSubmitError("Failed to save employee data. Please try again.");
      }
    }
  }; 
 
  return ( 
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth> 
      <DialogTitle>{editData ? 'Edit Employee' : 'Add Employee'}</DialogTitle> 
      <DialogContent>
        {submitError && (
          <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>
        )}
        
        <TextField 
          fullWidth 
          margin="dense" 
          label="Name" 
          name="name" 
          value={form.name} 
          onChange={handleChange}
          error={Boolean(attempted && errors.name)}
          helperText={attempted && errors.name}
          required
        /> 
        
        <FormControl 
          fullWidth 
          margin="dense"
          error={Boolean(attempted && errors.department_id)}
        >
          <InputLabel id="department-label">Department *</InputLabel> 
          <Select 
            labelId="department-label" 
            name="department_id" 
            value={form.department_id} 
            onChange={handleChange}
            label="Department *"
          > 
            {departments.map(d => ( 
              <MenuItem key={d.id} value={d.id}>{d.name}</MenuItem> 
            ))} 
          </Select>
          {attempted && errors.department_id && (
            <FormHelperText>{errors.department_id}</FormHelperText>
          )}
        </FormControl> 
        
        <TextField 
          fullWidth 
          margin="dense" 
          label="Date of Birth" 
          type="date" 
          name="dob" 
          value={form.dob} 
          onChange={handleChange} 
          InputLabelProps={{ shrink: true }}
          error={Boolean(attempted && errors.dob)}
          helperText={attempted && errors.dob}
          required
        /> 
        
        <TextField 
          fullWidth 
          margin="dense" 
          label="Phone" 
          name="phone" 
          value={form.phone} 
          onChange={handleChange}
          error={Boolean(attempted && errors.phone)}
          helperText={attempted && errors.phone ? errors.phone : "Format: 10 digits without spaces or dashes"}
          required
        /> 
        
        <TextField 
          fullWidth 
          margin="dense" 
          label="Email" 
          name="email" 
          value={form.email} 
          onChange={handleChange}
          error={Boolean(attempted && errors.email)}
          helperText={attempted && errors.email}
          required
        /> 
        
        <TextField 
          fullWidth 
          margin="dense" 
          label="Salary" 
          type="number" 
          name="salary" 
          value={form.salary} 
          onChange={handleChange}
          error={Boolean(attempted && errors.salary)}
          helperText={attempted && errors.salary}
          required
          InputProps={{ inputProps: { min: 0 } }}
        /> 
        
        <FormControlLabel 
          control={<Switch checked={form.status} onChange={handleChange} name="status" />} 
          label="Active" 
        /> 
        
        <Box sx={{ mt: 2, mb: 1 }}>
          <Button 
            variant="contained" 
            component="label" 
            color={attempted && errors.photo ? "error" : "primary"}
          > 
            {form.photo ? "Change Photo" : "Upload Photo"} 
            <input 
              type="file" 
              hidden 
              name="photo" 
              onChange={handleChange} 
              accept="image/*" 
            /> 
          </Button>
          
          {form.photo && (
            <Typography variant="caption" display="block" sx={{ mt: 1 }}>
              Selected file: {form.photo.name}
            </Typography>
          )}
          
          {attempted && errors.photo && (
            <FormHelperText error>{errors.photo}</FormHelperText>
          )}
        </Box>
      </DialogContent> 
      <DialogActions> 
        <Button onClick={onClose}>Cancel</Button> 
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
        >
          {editData ? 'Update' : 'Add'}
        </Button> 
      </DialogActions> 
    </Dialog> 
  ); 
}; 
 
export default EmployeeForm;