import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        user: null
    },
    mutations: {
        increment (state) {
            state.count++
        },
        setUser(state, payload) {
            state.user = payload;
        }
    },
    getters: {
        user(state) {
            return state.user;
        }
    },
    actions: {
        singUserUp({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const newUser = {
                        id : user.uid
                    }
                    commit('setUser', newUser);
                })
                .catch(error => {
                    console.log(error);
                })
        },
        singUserIn({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(user => {
                    const newUser = {
                        id : user.uid
                    }
                    commit('setUser', newUser);
                })
                .catch(error => {
                    console.log(error);
                })
        }
    }
})