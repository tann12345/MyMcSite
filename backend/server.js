const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const mineflayer = require("mineflayer");
const { mineflayer: mineflayerViewer } = require("prismarine-viewer");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const bot = mineflayer.createBot({
  host: "localhost", // change this to your server IP
  port: 25565,
  username: "BotLive"
});

bot.once("spawn", () => {
  console.log("Bot spawned");
  mineflayerViewer(bot, { port: 3007, firstPerson: true }); // bot screen viewer
});

// Serve static frontend
app.use(express.static("frontend"));

server.listen(3001, () => {
  console.log("Backend server running on port 3001");
});
