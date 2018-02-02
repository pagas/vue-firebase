import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router';
import * as firebase from 'firebase'

import 'jquery/dist/jquery.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/main.css';

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router,
    created() {
        firebase.initializeApp({
            apiKey: "AIzaSyAhoMJjTmMBRUuRdH_RUj8A17U599Qy0jA",
            authDomain: "pauliusapp-f0c4f.firebaseapp.com",
            databaseURL: "https://pauliusapp-f0c4f.firebaseio.com",
            projectId: "pauliusapp-f0c4f",
            storageBucket: "pauliusapp-f0c4f.appspot.com",
            messagingSenderId: "645105065174"
        });
        this.$store.dispatch('init');
    }
})
