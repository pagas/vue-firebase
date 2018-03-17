<template>

    <div >
        <h2>Chat room: {{conversation.name}}</h2>
        <button @click="loadMore()" v-if="!hideLoadMore">Load more</button>
        <div class="card" v-for="message in reverseMessages">
            <div class="card-header">
                {{getUserName(message.userId)}}: {{message.body}} {{message.createdAt | moment("calendar")}}
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
                messagesListener: null,
                hideLoadMore: false,
                lastVisible: null
            }
        },
        computed: {
            currentUserName() {
                return this.getUserName(this.$store.getters.user.id);
            },
            reverseMessages: state => {
                return state.messages.slice().reverse();
            }
        },
        watch: {
            lastVisible(newVisible) {
                if (this.messagesListener) {
                    this.messagesListener();
                }
                this.messagesListener = messagesApi.listenToMessages(this.conversation.id, newVisible, (response) => {
                    this.messages = response;
                })
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
                    body: this.body
                });
                this.body = '';
            },
            removeMessage(messageId) {
                messagesApi.removeMessage(messageId);
            },
            loadMore() {
                messagesApi.loadMoreMessages(this.conversation.id, this.lastVisible).then(response => {
                    this.messages = this.messages.concat(response.result);
                    this.lastVisible = response.lastVisible;
                    if (response.result.length < 3) {
                        this.hideLoadMore = true;
                    }
                })
            }
        },
        created() {
            messagesApi.getFirstMessages(this.conversation.id).then(response => {
                this.messages = response.result;
                this.lastVisible = response.lastVisible;
            })
        },
        destroyed() {
            if (this.messagesListener) {
                this.messagesListener();
            }
        }
    }
</script>

<style>
</style>
