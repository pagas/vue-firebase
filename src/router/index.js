import Vue from 'vue'
import VueRouter from 'vue-router'
import TheLogin from '../components/TheLogin.vue'
import TheProperties from '../components/TheProperties.vue'
import store from '../store';

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: TheLogin
        },
        {
            path: '/properties',
            name: 'properties',
            component: TheProperties
        },
        {
            path: '/logout',
            beforeEnter() {
                store.dispatch('singOut');
            }
        }
    ]
})