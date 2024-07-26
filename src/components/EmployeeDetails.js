import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Box
} from '@mui/material';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`);
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  if (!employee) return <div>Loading...</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>
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
        <Button variant="contained" color="secondary" component={Link} to="/">
          Back to Home
        </Button>
      </Box>
    </Container>
  );
};

export default EmployeeDetails;
