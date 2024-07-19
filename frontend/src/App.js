import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Contacts from './Contacts';
import Logout from './Logout'; // Import the Logout component
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/contacts"
            element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to={token ? "/contacts" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
