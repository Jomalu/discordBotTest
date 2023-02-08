const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.all("/", (req, res) => {
  res.send("Bot is running!");
});

app.all("/health", (req, res) => {
  res.send("OK");
});

const stayAwake = () => {
  app.listen(PORT, () => {
    console.log(`Bot is running in port ${PORT}.`);
  });
};

module.exports = stayAwake;
