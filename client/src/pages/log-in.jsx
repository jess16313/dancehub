import React, { useState } from 'react';
import './default.css';
import Navbar from '../assets/nav-bar.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function LogIn({ onLogin }) {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            console.log('Sending login request with:', { email: form.email }); // Don't log password
            const res = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: form.email,
                    password: form.password
                })
            });

            const data = await res.json();
            console.log('Login response:', data); // For debugging

            if (!res.ok) {
                setError(data.error || 'Login Failed');
            } else {
                onLogin(data.user);
                navigate('/');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="body">
            <Navbar/>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength="6"
                    />
                </div>
                <button 
                    type="submit" 
                    className="submit-button"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
                <div className="auth-link">
                    <h3>Don't have an account yet?</h3>
                    <Link to="/signup">Sign Up!</Link>
                </div>
            </form>
        </div>
    );
}

