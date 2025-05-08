import React, { useState } from "react";
import './default.css';
import Navbar from '../assets/nav-bar.jsx';


export default function SignUp(){
    const [form,setForm] = useState({pref_name:'', username:'',password:''});
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        try{
            const res = await fetch('http://localhost/3000/api/signup', {
                method:'POST',
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if(!res.ok){
                setError(data.error || 'SignUp Failed');
            }else{
                setUser(data.user);
            }
        }catch(err){
            console.error(err);
            setError('Something went wrong');
        }
    }
    return(
        <div className = "body">
            <Navbar/>
            <h2>Sign Up</h2>
            {error && <p style={{ color:'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    name="pref_name"
                    placeholder="Your Name"
                    value={form.pref_name}
                    onChange={handleChange}
                    required
                /><br/>
                <input
                    name="user_name"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    required
                    /><br/>
                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                /><br/>
                <input
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                /><br/>
                <button type="Submit">Sign Up</button>
                <h3>Already have an account?</h3>
                <a href='/login'>Log in!</a>
            </form>
        </div>
    )

}
