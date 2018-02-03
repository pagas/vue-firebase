import Vue from 'vue'
import VueRouter from 'vue-router'
import TheLogin from '../components/TheLogin.vue'
import TheProperties from '../components/property/TheProperties.vue'
import AddProperty from '../components/property/AddProperty.vue'
import EditProperty from '../components/property/EditProperty.vue'
import Property from '../components/property/Property.vue'
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
            path: '/property/new',
            name: 'addProperty',
            component: AddProperty
        },
        {
            path: '/property/:propertyId',
            name: 'property',
            component: Property,
            props: true
        },
        {
            path: '/property/edit/:propertyId',
            name: 'editProperty',
            component: EditProperty,
            props: true
        },
        {
            path: '/logout',
            beforeEnter() {
                store.dispatch('singOut');
            }
        }
    ]
})