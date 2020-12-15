const http = require("http");
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

const router = require("./router");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect("mongodb://localhost:27017/corporate", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error")
);

app.use(router);

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
