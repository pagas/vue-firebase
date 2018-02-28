<template>
    <div>
        <h1>Create Word list</h1>
        <add-word-form></add-word-form>

        <div class="card" v-for="word in words">
            <div class="card-header">
                <router-link :to="'/property/' + property.id">{{property.title}}</router-link>
            </div>
            <div class="card-body">
                <p class="card-text">{{property.description}}</p>
                <div>
                    <button class="btn btn-primary" @click="removeProperty(property.id)">Remove</button>
                    <button class="btn btn-primary" @click="editProperty(property.id)">Edit</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import AddWordForm from './AddWordForm.vue';
    export default {
        data () {
            return {
                words: []
            }
        },
        computed: {
        },
        methods: {
            removeWord(wordId) {
                this.$store.dispatch('removeWord', wordId);
            },
            loadWords() {
                this.$store.dispatch('loadWords').then(response => {
                    this.words = response;
                });
            }
        },
        created() {
            this.loadWords()
        },
        components: {
            AddWordForm: AddWordForm
        }
    }
</script>

<style>
</style>
