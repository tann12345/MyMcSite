const mineflayer = require('mineflayer');
const { pathfinder } = require('mineflayer-pathfinder');
const pvp = require('mineflayer-pvp').plugin;
const WebSocket = require('ws');

const bot = mineflayer.createBot({
  host: 'localhost', // change to your Minecraft server IP
  port: 25565,
  username: 'Bot123',
});

bot.loadPlugin(pvp);
bot.loadPlugin(pathfinder);

const wss = new WebSocket.Server({ port: 8081 });

function broadcast(message) {
  const data = JSON.stringify({ message });
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

bot.once('spawn', () => {
  broadcast('Bot has spawned in the world.');
  bot.chat('Bot is online! Use chat commands or website to control me.');
});

bot.on('chat', (username, message) => {
  broadcast(`[CHAT] <${username}>: ${message}`);

  if (username === bot.username) return;

  const msg = message.toLowerCase();

  if (msg.startsWith('bot123 kill')) {
    const targetName = message.split('kill')[1].trim();
    const target = bot.players[targetName]?.entity;

    if (!target) {
      const text = `Can't find player ${targetName}.`;
      bot.chat(text);
      broadcast(text);
    } else {
      const text = `Engaging PvP with ${targetName}!`;
      bot.chat(text);
      broadcast(text);
      bot.pvp.attack(target);
    }
  }

  if (msg === 'bot123 stop') {
    bot.pvp.stop();
    const text = 'Stopped PvP.';
    bot.chat(text);
    broadcast(text);
  }
});

// WebSocket heartbeat to avoid disconnect
wss.on('connection', ws => {
  ws.send(JSON.stringify({ message: 'Connected to bot WebSocket.' }));
});
