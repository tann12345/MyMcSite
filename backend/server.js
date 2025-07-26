const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const auth = require('./auth');
const { startBot } = require('./bot');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/frontend', express.static(path.join(__dirname, '../frontend')));

// Auth APIs
app.post('/api/register', auth.register);
app.post('/api/login', auth.login);

// Bot control
app.post('/api/start-bot', (req, res) => {
  const { host, username } = req.body;
  startBot({ host, username });
  res.json({ message: 'Bot started.' });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
