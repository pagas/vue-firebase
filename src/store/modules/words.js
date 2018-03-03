import firestore from '../../firestoreInit';

const state = {
    words: []
};
const getters = {
    words(state) {
        state.words;
    }
};
const mutations = {};
const actions = {
    addWord({rootState}, word) {
        word.userId = rootState.user.id;
        return firestore.collection('words').add(word)
            .catch(error => {
                console.log('error creating', error)
            });
    },
    loadWords({commit}, userId) {
        return firestore.collection('words').where('userId', '==', userId).get().then(snapshot => {
            let result = [];
            snapshot.forEach(doc => {
                result.push({...doc.data(), id: doc.id});
            })
            return result;
        });
    },
    removeWord({commit}, wordId) {
        return firestore.collection('words').doc(wordId).delete();
    }
};

export default {
    state,
    getters,
    mutations,
    actions
}