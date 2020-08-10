// const http = require("http");

// const server = http.createServer(app);

// var io = require("socket.io").listen(server);

// app.io = io;

// app.io.on("connection", async function (client) {
//   // require("./api/routes/users")(client);
//   // require("./sockets//messages")(client)`;

//   client.on("disconnect", function () {
//     console.log("Client disconnected");
//   });
// });

exports = module.exports = function (io) {
  io.sockets.on("connection", function (socket) {
    console.log("New client connected");
    //   socket.on('file2Event', function () {
    //     console.log('file2Event triggered');
    //   });

    io.sockets.on("disconnect", function () {
      console.log("Client disconnected");
    });
  });
};
