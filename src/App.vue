<template>
    <div id="app">
        <the-navigation></the-navigation>

        <div class="container">
            <router-view></router-view>

            <!--<div class="row">-->
                <!--<div class="col-sm-12">-->
                    <!--<the-login></the-login>-->
                <!--</div>-->
            <!--</div>-->
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
        components: {
            theNavigation: TheNavigation,
            theLogin: TheLogin
        }
    }
</script>