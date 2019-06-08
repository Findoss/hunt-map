var StaticServer = require('static-server');
var server = new StaticServer({
  rootPath: '.', // required, the root of the server file tree
  port: 80, // required, the port to listen
  name: 'my-http-server', // optional, will set "X-Powered-by" HTTP header
  host: 'localhost', // optional, defaults to any interface
  cors: '*', // optional, defaults to undefined
  followSymlink: true // optional, defaults to a 404 error
});

server.start(function() {
  console.log('Server listening to', server.port);
});

server.on('request', function(req, res) {});

server.on('symbolicLink', function(link, file) {
  console.log('File', link, 'is a link to', file);
});

server.on('response', function(req, res, err, file, stat) {});
