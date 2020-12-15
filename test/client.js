const express = require("express");
const app = express();
const http = require("http");
const axios = require("axios");
const port = process.env.PORT || 4000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.get("/view", async (req, res) => {
  try {
    const result = await axios.get("http://localhost:3000/");

    console.log(result.data);
    res.status(200).send(result.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      type: "error",
      message: error.message,
    });
  }
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    type: "error",
    error: error.message,
  });
});

const server = http.createServer(app);
server.listen(port);
