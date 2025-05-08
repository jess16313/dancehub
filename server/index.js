const express = require("express");
const cors = require("cors");
const db = require('./db');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async(req, res) => {
    const [rows] = await db.query('SELECT * from users');
    res.json(rows);
    res.send("Dance app backend works");
});

app.post('/api/signup', async (req,res) => {
    const{username, pref_name, email, password_hash} = req.body;

    if (!username|| !email || !password_hash|| !pref_name) {
        return res.status(400).json({error:'Missing required fields'});
    }

    try {
        const [result] = await db.query(
            'INSERT INTO users (username, pref_name, email, password_hash) VALUES (?, ?, ?, ?)',
            [username, pref_name, email, password_hash]
        )
        res.status(201).json({message:'user created!', userId: result.insertId});
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Failed to create user'});
    }
});

app.post('/api/login', async(req,res) =>{
    const {email, password} = req.body;

    if (!email||!password){
        return res.status(400).json({error: 'Missing req info'})
    }

    try {
        const[rows] = await db.query(
            'SELECT * FROM users WHERE email = AND password_hash = ?',
                [email,password]
        )
        if(rows.length === 0){
            return res.json(401).json({error: 'Incorrect Login'})
        }

        const user = rows[0];
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:'Database error'});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
