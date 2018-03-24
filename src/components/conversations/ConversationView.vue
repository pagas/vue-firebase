<template>
    <div class="row">
        <div class="col-sm-7">
            <conversation-chat v-if="conversation" :conversation="conversation"
                               :conversation-users="conversationUsers">
            </conversation-chat>
        </div>
        <div class="col-sm-5">
            <conversation-user-list :conversation-users="conversationUsers"
                                    :conversation="conversation">
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
    import ConversationChat from './ConversationChat.vue';

    export default {
        props:['conversationId'],
        data () {
            return {
                availableUsers: [],
                conversationUsers: [],
                conversation: null,
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
            addMessage() {
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
            conversationService.listenToNewUses(this.conversationId, (response) => {
                this.conversationUsers = response;
            }).then(listener => {
                this.userListener = listener;
            })

            conversationApi.getConversation(this.conversationId).then(response => {
                return this.conversation = response;
            });
        },
        destroyed() {
            if (this.userListener) {
                this.userListener();
            }
        },
        components: {
            ConversationUserList: ConversationUserList,
            ConversationChat: ConversationChat
        }
    }
</script>

<style>
</style>
