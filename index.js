var http = require("http");
var url = require("url");

/**
 * Creating and instantiating our server
 */
var server = http.createServer(function(req, res) {
  /**
   * 1) Ensure the requested route is
   * /hello.
   */
  var pathName = url.parse(req.url).pathname;
  var trimmedPath = pathName.replace(/^\/+|\/+$/g, "");

  var handler = routes[trimmedPath];

  /**
   * 2) Determine if this is a post request.
   */

  var method = req.method;
  var validMethod = method.toUpperCase() === "POST";

  if (typeof routes[trimmedPath] !== "undefined" && validMethod) {
    /**
     * 3) Set the appropriate content-type
     * application / json headers
     */
    res.setHeader("Content-Type", "application/json");

    /**
     * 4) Set our Response and send
     */
    handler(function(statusCode, content) {
      res.statusCode = statusCode;
      res.end(JSON.stringify(content));
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, function() {
  console.log("Listening on port 3000");
});

/**
 * Defining the handlers
 */
var handlers = {};

handlers.hello = function(callback) {
  callback(200, { data: "Welcome To Our Awesome API" });
};

/**
 * Defining our routes
 */
var routes = {
  hello: handlers.hello
};
