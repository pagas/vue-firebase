'use strict';
var admin = require("firebase-admin");
var Promise = require("bluebird");
var serviceAccount = require("../src/config/paulius-7557c-firebase-adminsdk-ngnqy-20ab98f2c3.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://paulius-7557c.firebaseio.com"
});

var http = require("http"),
    pathUtils = require("path"),
    express = require("express"),
    app = express(),
    PORT = process.env.PORT || 5000,
    appDir = pathUtils.resolve(__dirname, "../dist");

app.use(express.static(appDir));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.post("/getConversations", function (req, res) {
    console.log('hey get me all conversations:', req.body);
    var collectionPromises = [];
    req.body.conversationIds.forEach(id => {
        collectionPromises.push(admin.firestore().collection('conversations').doc(id).get()
            .then(doc => {
                var obj = doc.data();
                obj.id = doc.id;
                return obj;
            })
        );
    });

    Promise.all(collectionPromises).then(response => {
        res.json(response);
    })
});

app.get("*", function (req, res) {
    res.sendfile(pathUtils.resolve(appDir, "index.html"));
});

http.createServer(app).listen(PORT, function () {
    console.log("Express server listening on port " + PORT);
    console.log("http://localhost:" + PORT);
});