function startBot(event) {
  event.preventDefault(); // ✅ Fix: Make sure event is passed into the function

  const botName = document.getElementById('botName').value;
  const serverIp = document.getElementById('serverIp').value;
  const serverPort = document.getElementById('serverPort').value;

  fetch('https://minecraft-site-backend.onrender.com/api/start-bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      botName,
      serverIp,
      serverPort
    })
