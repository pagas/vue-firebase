import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router';

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
        this.$store.dispatch('init');
    }
})
