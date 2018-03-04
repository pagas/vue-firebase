<template>
    <div class="row">
        <div class="col-sm-7">
            <div class="card" v-for="message in messages">
                <div class="card-header">
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
        <div class="col-sm-7">
            <div class="card" v-for="user in conversationUsers">
                <div class="card-header">
                    {{user.name}}
                    <button @click="removeUser(user.id)">Remove</button>
                </div>
            </div>
            <button class="btn btn-default" @click.prevent="addUsers()">Add User</button>
        </div>


    </div>
</template>

<script>
    import messagesApi from '../../api/messages';
    import userApi from '../../api/users';
    import conversationApi from '../../api/conversations';

    export default {
        props:['conversationId'],
        data () {
            return {
                availableUsers: [],
                conversationUsers: [],
                conversation: null,
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
            },
            addUsers() {

            }
        },
        created() {
            this.conversationListener = messagesApi.listenToMessages(this.conversationId, (response) => {
                this.messages = response;
            })
            userApi.getUsers().then(response => {
                this.availableUsers = response;
            })

            conversationApi.getConversation(this.conversationId).then(response => {
                return this.conversation = response;
            }).then( response => {

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
