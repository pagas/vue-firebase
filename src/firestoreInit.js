import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './config/firebaseConfig'
const firebaseApp = firebase.initializeApp(firebaseConfig);
var firestore;

export default () =>{
    if (firestore) {
        return Promise.resolve(firestore);
    }

    return firebaseApp.firestore().enablePersistence().then(() => {
        return firestore = firebase.firestore()
    });
}