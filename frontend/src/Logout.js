import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
    <div class="logout-container">
        <button class="button3" onClick={handleLogout}>Logout</button>
    </div>
    );
};

export default Logout;
