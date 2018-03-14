<template>
    <div>
        <h3>Users:</h3>
        <div class="card" v-for="user in conversationUsers">
            <div class="card-header">
                {{user.name}}
                <button @click="removeUser(user.id)">Remove</button>
            </div>
        </div>
        <div v-if="availableUsers">
            <button class="btn btn-default" @click="addUsers()">Add User</button>
            <select v-model="selectedUserId">
                <option :value="null">Please select</option>
                <option v-for="user in availableUsers" :value="user.id">
                    {{ user.name }}
                </option>
            </select>
        </div>
    </div>

</template>

<script>
    import userApi from '../../api/users';
    import conversationService from '../../services/conversation.service';
    import userConversationApi from '../../api/userConversations';

    export default {
        props:[
            'conversationUsers',
            'conversation'
        ],
        data () {
            return {
                selectedUserId: null,
                allAvailableUsers: []
            }
        },
        computed: {
            availableUsers() {
                return this.allAvailableUsers.filter(availableUser => {
                    return !this.conversationUsers.some(user => {
                        return availableUser.id == user.id;
                    });
                });
            }
        },
        methods: {
            addUsers() {
                conversationService.addUserToConversation(this.selectedUserId, this.conversation.id);
            },
            removeUser(userId) {
                userConversationApi.removeUser(this.conversation.id, userId);
            }
        },
        created() {
            userApi.getUsers().then(response => {
                this.allAvailableUsers = response;
            })
        },
        destroyed() {
        }
    }
</script>

<style>
</style>
