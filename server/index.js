const express = require("express");
const cors = require("cors");
const db = require('./db');
const bcrypt = require('bcrypt');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Helper function to validate email format
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Helper function to validate password strength
const isValidPassword = (password) => {
    return password.length >= 8; // Basic requirement, you can make this stronger
};

app.get('/', async(req, res) => {
    try {
        const [rows] = await db.query('SELECT * from users');
        res.json({ message: "Dance app backend works", users: rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.post('/api/signup', async (req, res) => {
    const { username, pref_name, email, password_hash: password } = req.body;

    if (!username || !email || !password || !pref_name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate email format
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password strength
    if (!isValidPassword(password)) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    try {
        // Check if email already exists
        const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existingUsers.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // Check if username already exists
        const [existingUsernames] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
        if (existingUsernames.length > 0) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const [result] = await db.query(
            'INSERT INTO users (username, pref_name, email, password_hash) VALUES (?, ?, ?, ?)',
            [username, pref_name, email, hashedPassword]
        );

        const [newUserRows] = await db.query('SELECT id, username, pref_name, email FROM users WHERE id = ?', [result.insertId]);
        const newUser = newUserRows[0];
        res.status(201).json({ message: 'User created successfully!', user: newUser });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.post('/api/login', async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Missing required information' });
    }

    try {
        // Get user by email
        const [rows] = await db.query(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const user = rows[0];

        // Compare password with hashed password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Don't send password hash to client
        const { password_hash, ...userWithoutPassword } = user;
        res.status(200).json({ user: userWithoutPassword });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
});

app.get('/api/users/:id/servers', async(req, res) => {
    const userId = req.params.id;
    try {
        const [rows] = await db.query(
            'SELECT s.id, s.server_name FROM server_members sm JOIN servers s ON sm.server_id = s.id WHERE sm.user_id = ?',
            [userId]
        );

        res.json({ servers: rows });
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch servers' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
