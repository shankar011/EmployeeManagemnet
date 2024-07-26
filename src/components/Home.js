import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';

const Home = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setError('Failed to fetch employees');
        }
    };

    const handleSearch = () => {
        const filteredEmployees = employees.filter(employee =>
            employee.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (filteredEmployees.length === 0) {
            setError('Employee not found');
        } else {
            setError('');
            if (filteredEmployees.length === 1) {
                navigate(`/employees/${filteredEmployees[0].id}`, { state: { employee: filteredEmployees[0] } });
            } else {
                setEmployees(filteredEmployees);
            }
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Employee Management
            </Typography>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <TextField
                    label="Search by Employee Name"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setError('');
                    }}
                    style={{ marginRight: '10px', flexGrow: 1 }}
                />
                <Button variant="contained" color="primary" onClick={handleSearch} startIcon={<SearchIcon />}>
                    Search
                </Button>
                <Button style={{marginLeft: '20px' }} variant="contained" color="secondary" component={Link} to="/add" startIcon={<AddIcon />}>
                    Add Employee
                </Button>
            </div>
            {error && <Alert severity="error">{error}</Alert>}
            <List>
                {employees.map((employee) => (
                    <ListItem key={employee.id} button component={Link} to={`/employees/${employee.id}`}>
                        <ListItemText primary={employee.name} />
                        <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit" component={Link} to={`/edit/${employee.id}`}>
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>

        </Container>
    );
};

export default Home;
