<template>
    <div>
        <h1>Edit property</h1>
        <form v-if="property" @submit.prevent="editProperty()">

            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" v-model="property.title" class="form-control" id="title" placeholder="">
            </div>

            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" v-model="property.description" class="form-control" id="description" placeholder="">
            </div>

            <div class="form-group">
                <label for="title">Address</label>
                <input type="text" v-model="property.address" class="form-control" id="address" placeholder="">
            </div>

            <div class="form-group">
                <label for="image">Image</label>
                <input type="file" class="form-control-file" id="image">
            </div>

            <button type="submit" class="btn btn-primary">Edit</button>
        </form>
    </div>
</template>

<script>
    export default {
        props: ['propertyId'],
        data () {
            return {
                property: null
            }
        },
        methods: {
            editProperty() {
                this.$store.dispatch('editProperty', this.property);
                this.$router.push('/property/' + this.property.id);
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
