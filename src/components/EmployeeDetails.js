import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box,
  Alert
} from '@mui/material';

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployee();
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

  const handleDelete = async () => {
    try {
      await axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('Failed to delete employee');
    }
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <List>
        <ListItem>
          <ListItemText primary="Name" secondary={employee.name} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={employee.emailId} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Mobile" secondary={employee.mobile} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Country" secondary={employee.country} />
        </ListItem>
        <ListItem>
          <ListItemText primary="State" secondary={employee.state} />
        </ListItem>
        <ListItem>
          <ListItemText primary="District" secondary={employee.district} />
        </ListItem>
      </List>
      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button variant="contained" color="primary" component={Link} to={`/edit/${employee.id}`}>
          Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default EmployeeDetails;
