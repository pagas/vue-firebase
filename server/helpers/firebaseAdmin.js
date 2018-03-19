var admin = require("firebase-admin");
var serviceAccount = require("../../src/config/paulius-7557c-firebase-adminsdk-ngnqy-20ab98f2c3.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://paulius-7557c.firebaseio.com"
});

exports = module.exports = admin;