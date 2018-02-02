import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        properties: [
            {id: 1, title: 'first property'},
            {id: 2, title: 'second property'},
            {id: 3, title: 'third property'}
        ],
        loading: null,
        authError: null,
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
        init({ commit, state }) {
            if (state.initialized) {
                return;
            }
            state.initialized = true;

            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    console.log(user);
                    commit('setUser', user);
                } else {
                    commit('setUser', null);
                }
            });
        },
        singUserUp({commit}, payload) {
            commit('clearAuthError');
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const newUser = {
                        id : user.uid
                    }
                    commit('setUser', newUser);
                })
                .catch(error => {
                    commit('setAuthError', error);
                })
        },
        singUserIn({commit}, payload) {
            commit('clearAuthError');
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const newUser = {
                        id : user.uid
                    }
                    commit('setUser', newUser);
                })
                .catch(error => {
                    commit('setAuthError', error);
                })
        },
        singOut({commit}) {
            firebase.auth().signOut();
            commit('setUser', null);
        },
        autoSignIn({commit}, payload) {
            commit('setUser', {
                id: payload.uid
            })
        },
        fetchUserData({commit, getter}) {

        },
        createProperty({commit}, payload) {

        }
    }
})