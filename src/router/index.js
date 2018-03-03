import Vue from 'vue'
import VueRouter from 'vue-router'
import TheLogin from '../components/TheLogin.vue'
import TheSignUp from '../components/TheSignUp.vue'
import TheProperties from '../components/property/TheProperties.vue'
import AddProperty from '../components/property/AddProperty.vue'
import EditProperty from '../components/property/EditProperty.vue'
import Property from '../components/property/Property.vue'
import TheWords from '../components/words/TheWords.vue';
import TheConversations from '../components/conversations/TheConversationList.vue';
import ConversationView from '../components/conversations/ConversationView.vue';
import store from '../store';
import AuthGuard from './auth-guard'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: TheLogin
        },
        {
            path: '/signup',
            name: 'signup',
            component: TheSignUp
        },
        {
            path: '/properties',
            name: 'properties',
            component: TheProperties,
            beforeEnter: AuthGuard
        },
        {
            path: '/property/new',
            name: 'addProperty',
            component: AddProperty,
            beforeEnter: AuthGuard
        },
        {
            path: '/property/:propertyId',
            name: 'property',
            component: Property,
            props: true,
            beforeEnter: AuthGuard
        },
        {
            path: '/property/edit/:propertyId',
            name: 'editProperty',
            component: EditProperty,
            props: true,
            beforeEnter: AuthGuard
        },
        {
            path: '/words',
            name: 'words',
            component: TheWords,
            beforeEnter: AuthGuard
        },
        {
            path: '/conversations',
            name: 'conversations',
            component: TheConversations,
            beforeEnter: AuthGuard
        },
        {
            path: '/conversation/:conversationId',
            name: 'viewConversations',
            component: ConversationView,
            props: true,
            beforeEnter: AuthGuard
        },
        {
            path: '/logout',
            beforeEnter() {
                store.dispatch('singOut');
            }
        }
    ]
})