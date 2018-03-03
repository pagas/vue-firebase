<template>
    <div>
        <div class="card" v-for="conversation in conversations">
            <div class="card-header">
                <!--<router-link :to="'/property/' + property.id">{{property.title}}</router-link>-->
                {{conversation.name}}
                <button @click="removeConversation(conversation.id)">Remove</button>
            </div>
        </div>

        <form class="form-inline">
            <div class="form-group">
                <label>Name</label>
                <input v-model="name" type="text" class="form-control" placeholder="Conversation name">
            </div>
            <button type="submit" class="btn btn-default" @click.prevent="addConversation()">Add</button>
        </form>

    </div>
</template>

<script>
    import conversationApi from '../../api/conversations';
    export default {
        data () {
            return {
                conversations: [],
                conversationListener: null
            }
        },
        computed: {
        },
        methods: {
            addConversation() {
                conversationApi.addConversation({
                    userIds: [this.$store.getters.user.id],
                    name: this.name
                });
                this.name = '';
            },
            removeConversation(conversationId) {
                conversationApi.removeConversation(conversationId);
            }
        },
        created() {
            this.conversationListener = conversationApi.listenToConversations(this.$store.getters.user.id, (response) => {
                this.messages = response;
            })
        },
        destroyed() {
            if (this.conversationListener) {
                this.conversationListener();
            }
        },
        components: {
        }
    }
</script>

<style>
</style>
