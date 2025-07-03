import React, { useState } from "react";
import './default.css';
import Navbar from '../assets/nav-bar.jsx';
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
    const [form, setForm] = useState({
        pref_name: '',
        username: '',
        email: '',
        password_hash: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Sign Up Failed');
            } else {
                // Redirect to login page after successful signup
                navigate('/login', { 
                    state: { 
                        message: 'Sign up successful! Please log in.' 
                    } 
                });
            }
        } catch(err) {
            console.error(err);
            setError('Something went wrong');
        }
    }

    return (
        <div className="body">
            <Navbar/>
            <h2>Sign Up</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        name="pref_name"
                        placeholder="Your Name"
                        value={form.pref_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                        name="password_hash"
                        type="password"
                        placeholder="Password"
                        value={form.password_hash}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Sign Up</button>
                <div className="auth-link">
                    <h3>Already have an account?</h3>
                    <Link to="/login">Log in!</Link>
                </div>
            </form>
        </div>
    );
}
