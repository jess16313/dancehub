import React from 'react';
import { Link } from 'react-router-dom';
import './nav-bar.css';

export default function Navbar(){
    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/">
                    <img src="/pixelheart.png" alt="Dancehub" className="logo-img"/>
                </Link>
            </div>

            <div className="nav-right">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </nav>

    )
}
