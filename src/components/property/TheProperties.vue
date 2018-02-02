<template>
    <div>
        <h1>The properties page</h1>

        <button class="btn btn-primary" @click="addProperty()">Add Property</button>
        <br />

        <div class="card" v-for="property in properties">
            <div class="card-header">
                <router-link :to="'/property/' + property.id">{{property.title}}</router-link>
            </div>
            <div class="card-body">
                <p class="card-text">{{property.description}}</p>
                <div>
                    <button class="btn btn-primary" @click="removeProperty(property.id)">Remove</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                properties: []
            }
        },
        computed: {
        },
        methods: {
            addProperty() {
                this.$router.push('/property/new')
            },
            removeProperty(propertyId) {
                this.$store.dispatch('removeProperty', propertyId);
                this.loadProperties();
            },
            loadProperties() {
                this.$store.dispatch('loadProperties').then(response => {
                    this.properties = response;
                });
            }
        },
        created() {
            this.loadProperties()
        }
    }
</script>

<style>
</style>
