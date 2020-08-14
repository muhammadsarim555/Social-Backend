const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");

// var socket = require("socket.io");
const mongoose = require("./config/index");
const users = require("./api/routes/users");
const post = require("./api/routes/post");

const app = express();

const http = require("http");

const server = http.createServer(app);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/users", users);
app.use("/post", post);
app.get("/", (req, res) => {
  res.send("Hello world");
});

server.listen(8080, () => {
  console.log(`App is Listening on 8080`);
});

var io = require("socket.io").listen(server);

io.on("connection", async function (client) {
  console.log("New client connected");
  require("./api/routes/likes")(client);
  // require("./sockets//messages")(client)`;

  client.on("disconnect", function () {
    console.log("Client disconnected");
  });
});
