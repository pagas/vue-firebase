<template>

    <div >
        <h2>Chat room: {{conversation.name}}</h2>
        <div class="card" v-for="message in messages">
            <div class="card-header">
                {{getUserName(message.userId)}} : {{message.body}} // {{message.createdDate}}
                <button @click="removeMessage(message.id)">Remove</button>
            </div>
        </div>

        <form class="form-inline">
            <div class="form-group">
                <label>{{currentUserName}}</label>
            </div>
            <div class="form-group">
                <input v-model="body" type="text" class="form-control" id="exampleInputEmail2" placeholder="message">
            </div>
            <button type="submit" class="btn btn-default" @click.prevent="addMessage()">Send</button>
        </form>
    </div>

</template>

<script>
    import messagesApi from '../../api/messages';
    import userApi from '../../api/users';
    import conversationApi from '../../api/conversations';
    import conversationService from '../../services/conversation.service';
    import ConversationUserList from './ConversationUserList.vue';

    export default {
        props:[
            'conversation',
            'conversationUsers'
        ],
        data () {
            return {
                body: '',
                messages: [],
                conversationListener: null
            }
        },
        computed: {
            currentUserName() {
                return this.getUserName(this.$store.getters.user.id);
            }
        },
        methods: {
            getUserName(userId){
                let users = this.conversationUsers.filter(user => {
                    return user.id == userId;
                });
                return users.length > 0 && users[0].name;
            },
            addMessage() {
                messagesApi.addMessage({
                    conversationId: this.conversation.id,
                    userId: this.$store.getters.user.id,
                    body: this.body,
                    createdDate: Date.now()
                });
                this.body = '';
            },
            removeMessage(messageId) {
                messagesApi.removeMessage(messageId);
            },
            addUsers() {

            }
        },
        created() {
            this.conversationListener = messagesApi.listenToMessages(this.conversation.id, (response) => {
                this.messages = response;
            })
        },
        destroyed() {
            if (this.conversationListener) {
                this.conversationListener();
            }
        }
    }
</script>

<style>
</style>
