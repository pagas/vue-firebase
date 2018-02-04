<template>
    <div>
        <h1>Add property</h1>
        <form @submit.prevent="onCreateProperty()">

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
                <input type="file" @change="pickFile($event)" class="form-control-file" id="image">
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
                    address: '',
                    description: ''
                }
            }
        },
        methods: {
            onCreateProperty() {
                this.$store.dispatch('createProperty', this.property);
                this.$router.push('/properties')
            },
            pickFile(event) {
                const files = event.target.files;
                let filename = files[0].name;
                if (filename.lastIndexOf('.') <= 0) {
                    return alert('Please add valid file');
                }
//                const fileReader = new FileReader();
//                fileReader.addEventListener('load', () => {
//                    this.imageUrl = fileReader.result;
//                });
//                fileReader.readAsDataURL(files[0]);
                this.property.image = files[0];
            }
        }
    }
</script>

<style>
</style>
