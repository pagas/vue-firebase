import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import getFirestore from '../firestoreInit';
import properties from './modules/properties';
import words from './modules/words';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: [
        properties,
        words
    ],
    state: {
        user: null,
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
                    getFirestore().then(firestore => {
                        firestore.collection('users').doc(user.uid).get().then(doc => {
                            commit('setUser', {
                                id: user.uid,
                                email: user.email,
                                name: doc.data().name
                            });
                        })
                    });
                } else {
                    commit('setUser', null);
                }
            });
        },
        singUserUp({commit}, payload) {
            return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    return getFirestore().then(firestore => {
                        firestore.collection('users').doc(user.uid).set({
                            name: payload.name
                        }, {merge: true});
                    });
                });
        },
        singUserIn({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(response => {
                console.log('singin', response);
            });
        },
        singOut({commit}) {
            firebase.auth().signOut();
        },
        fetchUserData({commit, getter}) {

        },
    }
})