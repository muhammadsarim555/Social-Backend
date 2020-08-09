const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");

const mongoose = require("./config/index");
const users = require("./api/routes/users");
const post = require("./api/routes/post");

const app = express();

// const http = require("http");

// const server = http.createServer(app);

// var io = require("socket.io").listen(server);

// app.io = io;

// app.io.on("connection", async function (client) {
//   console.log("New client connected");
//   // require("./api/routes/users")(client);
//   // require("./sockets//messages")(client)`;

//   client.on("disconnect", function () {
//     console.log("Client disconnected");
//   });
// });

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

app.use("/users", users);
app.use("/post", post);
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(8080, () => {
  console.log(`App is Listening on 8080`);
});
