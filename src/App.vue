<template>
    <div id="app">
        <div class="container">
            <the-navigation></the-navigation>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import TheLogin from './components/TheLogin.vue';
    import TheNavigation from './components/TheNavigation.vue';

    export default {
        name: 'app',
        data() {
            return {
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