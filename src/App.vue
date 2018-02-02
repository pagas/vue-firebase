<template>
    <div id="app">
        <div class="container">
            <the-navigation></the-navigation>

            <router-view></router-view>

            isLoggedIn :: {{isLoggedIn}}
        </div>
    </div>
</template>

<script>
    import Test from './components/test.vue'
    import TheLogin from './components/TheLogin.vue';
    import TheNavigation from './components/TheNavigation.vue';

    export default {
        name: 'app',
        data() {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        computed: {
            user() {
                return this.$store.getters.user;
            },
            isLoggedIn() {
                return this.$store.getters.isLoggedIn
            }
        },
        components: {
            theNavigation: TheNavigation,
            theLogin: TheLogin
        }
    }
</script>