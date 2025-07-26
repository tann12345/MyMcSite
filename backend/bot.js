const mineflayer = require('mineflayer');
let bot;
function startBot({ host, port, username }) {
  if (bot) bot.end();
  bot = mineflayer.createBot({ host, port, username });
  bot.on('chat', (username, message) => {
    console.log(`${username}: ${message}`);
  });
  bot.once('spawn', () => console.log('🤖 Bot has spawned!'));
}
module.exports = { startBot };
