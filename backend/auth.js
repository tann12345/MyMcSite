const fs = require('fs');
const dbPath = './backend/db.json';

function loadUsers() {
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify([]));
  return JSON.parse(fs.readFileSync(dbPath));
}

function saveUsers(users) {
  fs.writeFileSync(dbPath, JSON.stringify(users, null, 2));
}

exports.register = (req, res) => {
  const users = loadUsers();
  const { username, password } = req.body;

  if (users.find(u => u.username === username)) {
    return res.status(409).json({ error: 'User already exists' });
  }

  users.push({ username, password });
  saveUsers(users);
  res.json({ message: 'Registered successfully' });
};

exports.login = (req, res) => {
  const users = loadUsers();
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  res.json({ message: 'Login successful' });
};
