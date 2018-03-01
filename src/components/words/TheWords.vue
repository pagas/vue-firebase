<template>
    <div>
        <h1>Create Word list</h1>
        <add-word-form></add-word-form>

        <div class="card" v-for="word in words">
            <div class="card-header">
                <!--<router-link :to="'/property/' + property.id">{{property.title}}</router-link>-->
                {{word.word}}
            </div>
            <!--<div class="card-body">-->
                <!--<p class="card-text">{{word.translation}}</p>-->
                <!--&lt;!&ndash;<div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<button class="btn btn-primary" @click="removeProperty(property.id)">Remove</button>&ndash;&gt;-->
                    <!--&lt;!&ndash;<button class="btn btn-primary" @click="editProperty(property.id)">Edit</button>&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->
            <!--</div>-->
        </div>

    </div>
</template>

<script>
    import AddWordForm from './AddWordForm.vue';
    import wordsApi from '../../api/words';
    export default {
        data () {
            return {
                words: [],
                wordsListener: null
            }
        },
        computed: {
        },
        methods: {
            removeWord(wordId) {
                this.$store.dispatch('removeWord', wordId);
            },
            loadWords() {
                this.$store.dispatch('loadWords', this.$store.getters.user.id).then(response => {
                    this.words = response;
                });
            }
        },
        created() {
            this.wordsListener = wordsApi.listenWords(this.$store.getters.user.id, (response) => {
                this.words = response;
            })
        },
        destroyed() {
            if (this.wordsListener) {
                this.wordsListener();
            }
        },
        components: {
            AddWordForm: AddWordForm
        }
    }
</script>

<style>
</style>
