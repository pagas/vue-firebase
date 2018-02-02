import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
        loading: null,
        authError: null
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
        }
    },
    actions: {
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
        }
    }
})