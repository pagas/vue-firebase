<template>
    <div>
        <div v-if="property">
            <h1>Property</h1>
            <label>Title:</label>
            {{property.title}}
            <br />
            <label>Description:</label>
            {{property.description}}
            <div v-if="property.imageUrl">
                <img :src="property.imageUrl" style="width:100px; height:100px;">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:['propertyId'],
        data () {
            return {
                property: null
            }
        },
        created() {
            this.$store.dispatch('loadProperty', this.propertyId).then(response => {
                this.property = response;
            });
        }
    }
</script>

<style>
</style>
