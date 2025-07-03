import React, { useState,useEffect } from 'react';
import './default.css';
import { useNavigate,useLocation } from 'react-router-dom';

export default function Home() {
    const location = useLocation();
    const user = location.state?.user;
    const navigate = useNavigate();

    const [servers, setServers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        async function fetchServers() {
            try {
                const res = await fetch(`http://localhost:3000/api/users/${user.id}/servers`);
                const data = await res.json();
                setServers(data.servers || []);
            } catch (err) {
                console.error('Error fetching channels:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchServers();
    }, [user, navigate]);

    if (!user) return null;
    if (loading) return <p> Welcome back {user.pref_name}</p>

    return (
        <>
    <div className='server-list'>
        {servers.length > 0 ? (
            <ul>
                {servers.map(servers => (
                    <li key={servers.id}>{servers.server_name}</li>
                ))}
            </ul>
        ) : (
            <div>
                <p>You're not in any servers yet</p>
                <button> Create a Server</button>
                <button>Join a Server</button>
            </div>
        )}
    </div>
    <div className='workspace'>
        <h2>Empty... for now</h2>
    </div>
</>
)
    ;
}

