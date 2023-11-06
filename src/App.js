import React, { useState, useEffect } from 'react';
import HomePage from './Components/HomePage'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import TeacherDashboard from './TeacherDashboard';
import AdminDashboard from './AdminDashboard';
import Student from './Student';
import Login from './Components/Login';
import Herosection from './Components/Herosection';
import About from './Components/About';
import Languages from './Components/Languages';
import Teachers from './Components/Teachers';
import Contact from './Components/Contact';

const App = () => {
  const [userRole, setUserRole] = useState(null);

  const handleSetUserRole = (role) => {
    setUserRole(role);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login setUserRole={handleSetUserRole} />} />
          <Route path="/student" element={<Student />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
