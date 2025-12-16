const express = require("express");
const cors = require("cors");
const fs = require("fs");
const WebSocket = require("ws");

const app = express();
app.use(cors());

const questions = JSON.parse(fs.readFileSync("questions.json", "utf8"));

app.get("/question", (req, res) => {
  res.json(questions[0]);
});

const server = app.listen(3000, () =>
  console.log("Backend running on port 3000")
);

const wss = new WebSocket.Server({ server });

wss.on("connection", ws => {
  console.log("Client connected");

  ws.on("message", message => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
