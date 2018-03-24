var rp = require('request-promise');
var config = require("../../src/config/paulius-7557c-firebase-adminsdk-ngnqy-20ab98f2c3.json");
var SCOPES = [
    "https://www.googleapis.com/auth/firebase.remoteconfig"
];
function getAccessToken() {
    return new Promise(function(resolve, reject) {
        var key = config;
        var jwtClient = new google.auth.JWT(
            key.client_email,
            null,
            key.private_key,
            SCOPES,
            null
        );
        jwtClient.authorize(function(err, tokens) {
            if (err) {
                reject(err);
                return;
            }
            resolve(tokens.access_token);
        });
    });
}

module.exports.getConfig = function() {
    getAccessToken().then(token => {
        return rp({
            uri: "firebaseremoteconfig.googleapis.com/v1/projects/" + config.project_id + "/remoteConfig",
            method: "GET",
            auth: {
                'bearer': token
            }
        }).then(response => {
            console.log('resp', response)
        });
    })
};

