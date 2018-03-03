<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link to="/">WebSiteName <span v-if="userName">({{userName}})</span> </router-link>
            </div>
            <ul class="nav navbar-nav">
                <li v-for="item in menuItems" :key="item.title">
                    <router-link :to="item.path">{{ item.title }}</router-link>
                </li>
            </ul>
        </div>
    </nav>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        computed: {
            menuItems() {
                var menuItems =  [
                    {title: 'Login', path: '/login'},
//                    {title: 'Sign Up', path: '/signup'},
                ];
                if (this.userIsAuthenticated) {
                    menuItems =  [
                        {title: 'Logout', path: '/logout'},
                        {title: 'Properties', path: '/properties'},
                        {title: 'Words', path: '/words'},
                        {title: 'Conversations', path: '/conversations'},
                    ];
                }
                return menuItems;
            },
            userIsAuthenticated() {
                return this.$store.getters.user != null;
            },
            userName() {
                return this.$store.getters.isLoggedIn ? this.$store.getters.user.name : '';
            }
        },
        methods: {
        }
    }
</script>