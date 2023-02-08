const express = require("express");
const app = express();

app.all("/", (req, res) => {
  res.send("Bot is running!");
});

app.all("/health", (req, res) => {
  res.send("OK");
});

const stayAwake = () => {
  app.listen(3000, () => {
    console.log("Bot is running.");
  });
};

module.exports = stayAwake;
