import Vue from 'vue'
import VueRouter from 'vue-router'
import TheLogin from '../components/TheLogin.vue'
import TheProperties from '../components/TheProperties.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'login',
            component: TheLogin
        },
        {
            path: '/properties',
            name: 'properties',
            component: TheProperties
        },
    ]
})