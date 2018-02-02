import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    // created() {
    //     var config = {
    //         apiKey: "AIzaSyAhoMJjTmMBRUuRdH_RUj8A17U599Qy0jA",
    //         authDomain: "pauliusapp-f0c4f.firebaseapp.com",
    //         databaseURL: "https://pauliusapp-f0c4f.firebaseio.com",
    //         projectId: "pauliusapp-f0c4f",
    //         storageBucket: "pauliusapp-f0c4f.appspot.com",
    //         messagingSenderId: "645105065174"
    //     };
    //     firebase.initializeApp(config);
    // }
})
