import React, { useState } from 'react';
import './default.css';

export default function LogIn (){
    const [form, setForm] = useState({email: '', password: ''});
    const [user, setUser] = useState(null);
    const [error,setError] = useState('');

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');

        try{
            const res =await fetch('http://localhost/3000/api/login',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify(form)
            });

            const data = await res.json();

            if (!res.ok){
                setError(data.error || 'Login Failed');
            } else{
                setUser(data.user);
            }
        }catch(err){
            console.error(err);
            setError('Something went wrong');
        }

        return(
            <div className = "body">
                <h2>Login</h2>
                {error && <p style={{ color: 'red'}}>{error}</p>}
                {!user? (
                    <form onSubmit={handleSubmit}>
                        <input
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            /><br/>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            /><br/>
                        <button type = "submit">Login</button>
                    </form>
                    ):(
                        <div>
                        <h3>Welcome back, {user.pref_name}!</h3>
                            <h1>This works.</h1>
                        </div>
                    )};
            </div>
        )
    }
}

