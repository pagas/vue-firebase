<template>
    <div class="row">
        <div class="col-sm-7">
            <div v-if="conversation">
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
                    <button type="submit" class="btn btn-default" @click.prevent="addConversation()">Send</button>
                </form>
            </div>
        </div>
        <div class="col-sm-5">
            <conversation-user-list :conversation-users="conversationUsers" :conversation="conversation">
            </conversation-user-list>
        </div>
    </div>
</template>

<script>
    import messagesApi from '../../api/messages';
    import userApi from '../../api/users';
    import conversationApi from '../../api/conversations';
    import conversationService from '../../services/conversation.service';
    import ConversationUserList from './ConversationUserList.vue';

    export default {
        props:['conversationId'],
        data () {
            return {
                availableUsers: [],
                conversationUsers: [],
                conversation: null,
                body: '',
                messages: [],
                conversationListener: null,
                userListener: null
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
            addConversation() {
                messagesApi.addMessage({
                    conversationId: this.conversationId,
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
            this.conversationListener = messagesApi.listenToMessages(this.conversationId, (response) => {
                this.messages = response;
            })
            this.userListener = conversationService.listenToNewUses(this.conversationId, (response) => {
                this.conversationUsers = response;
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
            if (this.userListener) {
                this.userListener();
            }
        },
        components: {
            ConversationUserList: ConversationUserList
        }
    }
</script>

<style>
</style>
