import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router';
import * as firebase from 'firebase'
import resource from 'vue-resource';

import 'jquery/dist/jquery.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './css/main.css';

Vue.use(resource);

new Vue({
    el: '#app',
    render: h => h(App),
    store,
    router,
    created() {
        this.$store.dispatch('init');
        const messaging  = firebase.messaging();
        messaging.requestPermission()
            .then(() => {
                console.log('have permission');
                return messaging.getToken();
            })
            .then(token => {
                console.log('msg token', token);
            })
            .catch((err) => {
                console.log('Noo permission', err);
            })

        // Handle incoming messages. Called when:
        // - a message is received while the app has focus
        // - the user clicks on an app notification created by a sevice worker
        //   `messaging.setBackgroundMessageHandler` handler.
        messaging.onMessage(function(payload) {
            console.log("Message received. ", payload);
        });
    }
})
