import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Box
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) fetchEmployee();
    fetchCountries();
  }, [id]);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
      setEmployee(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employee details:', error);
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!employee.name) {
      tempErrors.name = "Name is required";
      isValid = false;
    }
    if (!employee.emailId.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      tempErrors.emailId = "Invalid email format";
      isValid = false;
    }
    if (!employee.mobile.match(/^\d{10}$/)) {
      tempErrors.mobile = "Mobile number must be 10 digits";
      isValid = false;
    }
    if (!employee.country) {
      tempErrors.country = "Country is required";
      isValid = false;
    }
    if (!employee.state) {
      tempErrors.state = "State is required";
      isValid = false;
    }
    if (!employee.district) {
      tempErrors.district = "District is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        setLoading(true);
        if (id) {
          await axios.put(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`, employee);
        } else {
          await axios.post('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee', employee);
        }
        setLoading(false);
        navigate('/');
      } catch (error) {
        console.error('Error submitting employee details:', error);
        setLoading(false);
      }
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {id ? 'Edit Employee' : 'Add Employee'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Email ID"
          name="emailId"
          type="email"
          value={employee.emailId}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.emailId}
          helperText={errors.emailId}
        />
        <TextField
          label="Mobile"
          name="mobile"
          value={employee.mobile}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.mobile}
          helperText={errors.mobile}
        />
        <FormControl fullWidth margin="normal" error={!!errors.country}>
          <InputLabel>Country</InputLabel>
          <Select
            name="country"
            value={employee.country}
            onChange={handleChange}
          >
            <MenuItem value="">Select Country</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.country}>
                {country.country}
              </MenuItem>
            ))}
          </Select>
          {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
        </FormControl>
        <TextField
          label="State"
          name="state"
          value={employee.state}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.state}
          helperText={errors.state}
        />
        <TextField
          label="District"
          name="district"
          value={employee.district}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!errors.district}
          helperText={errors.district}
        />
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button variant="contained" color="primary" type="submit">
            {id ? 'Update' : 'Add'}
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate('/')}>
            Cancel
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AddEditEmployee;
