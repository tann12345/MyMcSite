const mineflayer = require('mineflayer');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let bot;

app.post("/start-bot", (req, res) => {
  const { serverIP, command } = req.body;

  if (bot) bot.quit();

  bot = mineflayer.createBot({
    host: serverIP,
    username: 'ZubiduBot'
  });

  bot.once('spawn', () => {
    if (command === "mine") bot.chat("Starting to mine...");
    if (command === "pvp") bot.chat("Let’s fight!");
    if (command === "follow") bot.chat("Following...");
    res.send({ status: "Bot spawned and command sent!" });
  });

  bot.on('error', err => {
    console.log("Bot error:", err.message);
    res.status(500).send({ error: err.message });
  });
});

app.listen(3000, () => console.log("✅ Backend running on port 3000"));
