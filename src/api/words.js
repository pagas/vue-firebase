import firestore from '../firestoreInit';

export default {
    listenWords(userId, callback) {
        return firestore.collection('words').where('userId', '==', userId).onSnapshot(snapshot => {
            let result = [];
            snapshot.forEach(doc => {
                result.push({...doc.data(), id: doc.id});
            })
            callback(result);
        })
    }
}