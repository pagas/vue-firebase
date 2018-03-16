<template>
    <div>
        <div class="card" v-for="conversation in conversations">
            <div class="card-header">
                <!--<router-link :to="'/property/' + property.id">{{property.title}}</router-link>-->
                {{conversation.name}}
                <button @click="removeConversation(conversation.id)">Remove</button>
                <button @click="openConversation(conversation.id)">Open</button>
            </div>
        </div>
        <button @click="loadMore()" v-if="!hideLoadMore">Load more</button>

        <form class="form-inline">
            <div class="form-group">
                <label>Conversation Name</label>
                <input v-model="name" type="text" class="form-control" placeholder="Conversation name">
            </div>
            <button type="submit" class="btn btn-default" @click.prevent="addConversation()">Add</button>
        </form>

    </div>
</template>

<script>
    import conversationApi from '../../api/conversations';
    import userConversationApi from '../../api/userConversations';
    import conversationService from '../../services/conversation.service';
    export default {
        data () {
            return {
                name: '',
                conversations: [],
                conversationListener: null,
                hideLoadMore: false,
                lastVisible: null
            }
        },
        computed: {
        },
        watch: {
            lastVisible(newVisible) {
                if (this.conversationListener) {
                    this.conversationListener();
                }
                this.conversationListener = conversationService.listenToNewConversations(this.$store.getters.user.id, newVisible, (response) => {
                    this.conversations = response;
                })
            }
        },
        methods: {
            addConversation() {
                const conversation = {name: this.name};
                conversationService.addConversation(conversation, this.$store.getters.user);
                this.name = '';
            },
            openConversation(conversationId) {
                this.$router.push('/conversation/' + conversationId);
            },
            removeConversation(conversationId) {
                conversationApi.removeConversation(this.$store.getters.user.id, conversationId);
            },
            loadMore() {
                userConversationApi.loadMoreConversations(this.$store.getters.user.id, this.lastVisible).then(response => {
                    this.conversations = this.conversations.concat(response.result);
                    this.lastVisible = response.lastVisible;
                    if (response.result.length < 3) {
                        this.hideLoadMore = true;
                    }
                })
            }
        },
        created() {
            userConversationApi.getFirstConversations(this.$store.getters.user.id).then(response => {
                this.conversations = response.result;
                this.lastVisible = response.lastVisible;
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
