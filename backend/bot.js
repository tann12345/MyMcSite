const mineflayer = require('mineflayer');

let bot;

function startBot({ host, username }) {
  bot = mineflayer.createBot({
    host: host,
    port: 25565,
    username: username
  });

  bot.on('spawn', () => {
    console.log('Bot spawned!');
  });

  bot.on('chat', (username, message) => {
    console.log(`${username}: ${message}`);
  });
}

module.exports = { startBot };
