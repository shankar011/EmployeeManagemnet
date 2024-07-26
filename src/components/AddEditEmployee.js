import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Alert
} from '@mui/material';

const AddEditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    emailId: '',
    mobile: '',
    country: '',
    state: '',
    district: ''
  });
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) fetchEmployee();
    fetchCountries();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setError('Failed to fetch employee details');
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
      setError('Failed to fetch countries');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`, employee);
      } else {
        await axios.post('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee', employee);
      }
      navigate('/');
    } catch (error) {
      console.error('Error submitting employee details:', error);
      setError('Failed to submit employee details');
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Employee' : 'Add Employee'}
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Email ID"
          name="emailId"
          value={employee.emailId}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Mobile"
          name="mobile"
          value={employee.mobile}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Country"
          name="country"
          value={employee.country}
          onChange={handleChange}
          select
          variant="outlined"
          fullWidth
          required
          margin="normal"
        >
          <MenuItem value="">
            <em>Select Country</em>
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.country}>
              {country.country}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="State"
          name="state"
          value={employee.state}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="District"
          name="district"
          value={employee.district}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default AddEditEmployee;
