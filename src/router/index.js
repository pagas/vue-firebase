import Vue from 'vue'
import VueRouter from 'vue-router'
import TheLogin from '../components/TheLogin.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/',
            name: 'login',
            component: TheLogin
        }
    ]
})