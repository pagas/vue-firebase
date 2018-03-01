<template>
    <div>

        <form class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">Word</label>
                <div class="col-sm-10">
                    <input v-model="word.word" type="text" class="form-control"  placeholder="word">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Translation</label>
                <div class="col-sm-10">
                    <input v-model="word.translation" type="text" class="form-control" placeholder="Translation">
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">Tags</label>
                <div class="col-sm-10">
                    <input v-model="word.tags" type="text" class="form-control" placeholder="Tags">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-default" @click.prevent="addWord()">Add Word</button>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                word: {
                    word: '',
                    translation: '',
                    tags: []
                }
            }
        },
        computed: {
        },
        methods: {
            addWord() {
                this.$store.dispatch('addWord', this.word)
                    .then(() => {
                        console.log('successfully added')
                    });
            },
        },
        created() {

        }
    }
</script>

<style>
</style>
