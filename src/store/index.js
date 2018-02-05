import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import firestore from '../firestoreInit';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        properties: [],
        loading: null, // can be later implemented when ever asynchronous call is made we can show spinner
        authError: null, // can be later implemented show authentication errors in the page
        initialized: null
    },
    mutations: {
        setUser(state, payload) {
            state.user = payload;
        },
        setLoading(state, payload) {
            state.loading = payload;
        },
        setAuthError(state, payload) {
            state.authError = payload;
        },
        clearAuthError(state) {
            state.authError = null;
        }
    },
    getters: {
        user(state) {
            return state.user;
        },
        isLoggedIn(state) {
            return state.user != null;
        },
        loadedProperties(state) {
            // we can do soring if we want to get sorted properties
            return state.properties;
        }
    },
    actions: {
        init({commit, state}) {
            if (state.initialized) {
                return;
            }
            state.initialized = true;
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    firestore.collection('users').doc(user.uid).get().then(doc => {
                        commit('setUser', {
                            id: user.uid,
                            email: user.email,
                            name: doc.data().name
                        });
                    })
                } else {
                    commit('setUser', null);
                }
            });
        },
        singUserUp({commit}, payload) {
            return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    return firestore.collection('users').doc(user.uid).set({
                        name: payload.name
                    }, {merge: true});
                });
        },
        singUserIn({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
        },
        singOut({commit}) {
            firebase.auth().signOut();
        },
        fetchUserData({commit, getter}) {

        },
        createProperty({commit}, property) {
            property.creatorId = this.getters.user.id;
            var propertyId;
            var image = property.image;
            delete property.image;
            firestore.collection('properties').add(property)
                .then(data => {
                    propertyId = data.id;
                    const filename = image.name;
                    const ext = filename.slice(filename.lastIndexOf('.'));
                    return firebase.storage().ref('properties/' + propertyId + ext).put(image);
                })
                .then(fileData => {
                    const imageUrl = fileData.metadata.downloadURLs[0];
                    return firestore.collection('properties').doc(propertyId).update({
                        imageUrl: imageUrl
                    });
                })
                .catch(error => {
                    console.log('error creating', error)
                });
        },
        editProperty({commit}, property) {
            var propertyId = property.id;
            var image = property.image;
            delete property.image;
            firestore.collection('properties').doc(property.id).update(property)
                .then(data => {
                    if (image) {
                        const filename = image.name;
                        const ext = filename.slice(filename.lastIndexOf('.'));
                        return firebase.storage().ref('properties/' + propertyId + ext).put(image);
                    }
                })
                .then(fileData => {
                    const imageUrl = fileData.metadata.downloadURLs[0];
                    return firestore.collection('properties').doc(propertyId).update({
                        imageUrl: imageUrl
                    });
                })
                .catch(error => {
                    console.log('error creating', error)
                });
        },
        loadProperties({commit}) {
            return firestore.collection('properties').get().then(snapshot => {
                let result = [];
                snapshot.forEach(doc => {
                    result.push({...doc.data(), id: doc.id});
                })
                return result;
            });
        },
        loadProperty({commit}, propertyId) {
            return firestore.collection('properties').doc(propertyId).get().then(doc => {
                return {...doc.data(), id: doc.id};
            });
        },
        removeProperty({commit}, propertyId) {
            return firestore.collection('properties').doc(propertyId).delete();
        }
    }
})