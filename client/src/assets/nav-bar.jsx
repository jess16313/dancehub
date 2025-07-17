import React from 'react';
import { Link } from 'react-router-dom';
import './nav-bar.css';

export default function Navbar(){
    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/">

                </Link>
            </div>

            <div className="nav-right">
                <Link to="/">Home</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </nav>

    )
}
