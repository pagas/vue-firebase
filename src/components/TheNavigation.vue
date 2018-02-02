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
                menuItems: [
                    {title: 'Login', path: '/login'},
                    {title: 'Logout', path: '/logout'},
                    {title: 'Properties', path: '/properties'}
                ]
            }
        }

    }
</script>