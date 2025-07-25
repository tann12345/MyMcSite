const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/auth'); // Make sure this file exists and exports User

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from frontend on Render
app.use(cors({
  origin: 'https://zubidu.onrender.com',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect('your_mongodb_connection_string', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB Connected');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Register Route
app.post('/api/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
});

// ✅ Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Invalid email or password' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
