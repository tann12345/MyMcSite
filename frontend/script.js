function register(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(data => {
    alert(data.message);
    if (!data.error) location.href = 'login.html';
  });
}

function login(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.json()).then(data => {
    alert(data.message);
    if (!data.error) location.href = 'dashboard.html';
  });
}

function startBot(e) {
  e.preventDefault();
  const host = document.getElementById('host').value;
  const username = document.getElementById('botUsername').value;

  fetch('/api/start-bot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ host, username })
  }).then(res => res.json()).then(data => {
    document.getElementById('status').textContent = data.message;
  });
}
