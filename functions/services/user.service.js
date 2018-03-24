var admin = require("../helpers/firebaseAdmin");
var collectionName = 'users';

exports.getUser = function(userId){
    return admin.firestore().collection(collectionName).doc(userId).get().then(doc => {
        var user = doc.data();
        user.id = doc.id;
        return user;
    })
};