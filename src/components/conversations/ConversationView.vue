<template>
    <div>
        <div class="card" v-for="message in messages">
            <div class="card-header">
                <!--<router-link :to="'/property/' + property.id">{{property.title}}</router-link>-->
                {{message.id}} : {{message.body}} // {{message.createdDate}}
                <button @click="removeConversation(message.id)">Remove</button>
            </div>
        </div>

        <form class="form-inline">
            <div class="form-group">
                <label>{{username}}</label>
            </div>
            <div class="form-group">
                <input v-model="body" type="text" class="form-control" id="exampleInputEmail2" placeholder="message">
            </div>
            <button type="submit" class="btn btn-default" @click.prevent="addConversation()">Send</button>
        </form>


    </div>
</template>

<script>
    import messagesApi from '../../api/messages';
    export default {
        props:['conversationId'],
        data () {
            return {
                body: '',
                messages: [],
                conversationListener: null
            }
        },
        computed: {
            username() {
                return this.$store.getters.user.name;
            }
        },
        methods: {
            addConversation() {
                messagesApi.addMessage({
                    conversationId: this.conversationId,
                    userId: this.$store.getters.user.id,
                    body: this.body,
                    createdDate: Date.now()
                });
                this.body = '';
            },
            removeConversation(messageId) {
                messagesApi.removeConversation(messageId);
            }
        },
        created() {
            this.conversationListener = messagesApi.listenToMessages(this.conversationId, (response) => {
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
