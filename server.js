var StaticServer = require("static-server");

var server = new StaticServer({
	rootPath: "./client/",
	port: 3000
});

server.start(function() {
	console.log("Goliath online! ", server.port);
});
