<template>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">WebSiteName</a>
            </div>
            <ul class="nav navbar-nav">
                <li v-for="item in menuItems" :key="item.title">
                    <a :href="item.path">{{ item.title }}</a>
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
                let menuItems =  [
                    {title: 'Login', path: '/login'},
                ];
                if (this.userIsAuthenticated) {
                    menuItems =  [
                        {title: 'Logout', path: '/logout'},
                        {title: 'Properties', path: '/properties'}
                    ];
                }
                return menuItems;
            },
            userIsAuthenticated() {
                return this.$store.getters.user != null;
            }
        }
    }
</script>