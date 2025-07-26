const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Allow frontend access
app.use(cors({
  origin: 'https://zubidu.onrender.com',  // ✅ your frontend site
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Your register route (example)
app.post('/api/register', (req, res) => {
  const { email, password } = req.body;
  // Save to DB or file...
  res.json({ message: 'User registered successfully' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
