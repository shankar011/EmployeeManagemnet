import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddEditEmployee from './components/AddEditEmployee';
import EmployeeDetails from './components/EmployeeDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddEditEmployee />} />
      <Route path="/edit/:id" element={<AddEditEmployee />} />
      <Route path="/employees/:id" element={<EmployeeDetails />} />
    </Routes>
  );
};

export default App;
