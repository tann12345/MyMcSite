function startBot(event) {
  event.preventDefault(); // ✅ Make sure the event is passed

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
  })
  .then(response => response.json())
  .then(data => {
    console.log('✅ Bot started:', data);
    alert("Bot started successfully!");
  })
  .catch(error => {
    console.error('❌ Error starting bot:', error);
    alert("Failed to start bot.");
  });
}
