<template>
    <div>
        <h1>The properties page</h1>
        <button class="btn btn-primary" @click="addProperty()">Add Property</button>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        computed: {
            properties() {

            }
        },
        methods: {
            addProperty() {
                this.$router.push('/property/new')
            }
        }
    }
</script>

<style>
</style>
