<template>
    <div>
        <h1>Add property</h1>
        <form @submit.prevent="submitForm()">

            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" v-model="property.title" class="form-control" id="title" placeholder="">
            </div>

            <div class="form-group">
                <label for="title">Address</label>
                <input type="text" v-model="property.address" class="form-control" id="address" placeholder="">
            </div>

            <button type="submit" class="btn btn-primary">Create</button>
        </form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                property: {
                    title: '',
                    address: ''
                }
            }
        },
        methods: {
            submitForm() {
                console.log('do submission');
            }
        }
    }
</script>

<style>
</style>
