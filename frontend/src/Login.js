import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header'; 
import starsSvg from './stars-svgrepo-com.svg';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/users/login', formData);
            console.log(res.data);
            localStorage.setItem('token', res.data.accessToken);
            navigate('/contacts');
        } catch (err) {
            console.error('Error logging in: ', err);
        }
    };

    return (
        <div>
          <Header /> 
          
            <div class="h2-container"><h2>Login or register</h2></div>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                <button class="button1" type="submit">Login</button>
            </form>
            <p class="basic-text">
                Don't have an account yet? <Link class="register-link" to="/register">Register here</Link>
            </p>

            <div class="h1-container"> <h1 class="h1-text">Why do you need to register?</h1>
           <p >Welcome to my portfolio project that shows of my Node.js, React and MongoDB skills. I added the login and registration to make the app more complex. Feel free to use a made up email with a silly nonsecure password. </p></div>

           <div className="steps-container">
      <div className="item">
        <img src={starsSvg} alt="Register" />
        <h3>Register</h3>
      </div>
      <div className="item">
        <img src={starsSvg} alt="Login" />
        <h3>Login</h3>
      </div>
      <div className="item">
        <img src={starsSvg} alt="Manage your contacts" />
        <h3>Manage your contacts</h3>
      </div>
    </div>
        </div>
    );
};

export default Login;
