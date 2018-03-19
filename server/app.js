'use strict';
var conversation = require('./routes/conversations');

var http = require("http"),
    pathUtils = require("path"),
    express = require("express"),
    app = express(),
    PORT = process.env.PORT || 5000,
    appDir = pathUtils.resolve(__dirname, "../dist");

app.use(express.static(appDir));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

// register conversation routes
app.use(conversation);

app.get("*", function (req, res) {
    res.sendfile(pathUtils.resolve(appDir, "index.html"));
});


http.createServer(app).listen(PORT, function () {
    console.log("Express server listening on port " + PORT);
    console.log("http://localhost:" + PORT);
});