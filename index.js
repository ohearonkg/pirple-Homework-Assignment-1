var http = require("http");

/**
 * Creating and instantiating our server
 */
var server = http.createServer(function(req, res) {});

server.listen(3000, function() {
  console.log("Listening on port 3000");
});
