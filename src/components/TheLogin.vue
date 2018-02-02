<template>
    <form class="form-horizontal" @submit.prevent="onSignIn()">
        <fieldset>
            <div id="legend">
                <legend class="">Login</legend>
            </div>
            <div class="control-group">
                <!-- Username -->
                <label class="control-label" for="email">Email</label>
                <div class="controls">
                    <input type="email" v-model="email" id="email" name="username" placeholder="" required>
                </div>
            </div>
            <div class="control-group">
                <!-- Password-->
                <label class="control-label" for="password">Password</label>
                <div class="controls">
                    <input type="password" v-model="password" id="password" name="password" placeholder="" required>
                </div>
            </div>
            <div class="control-group">
                <!-- Button -->
                <div class="controls">
                    <input type="submit" class="btn btn-success" value="Login">
                </div>
            </div>
        </fieldset>
    </form>
</template>

<script>
    export default {
        data() {
            return{
                email: '',
                password: ''
            }
        },
        computed: {
          // do some password comparison or other calculations
            user() {
                return this.$store.getters.user;
            }
        },
        watch: {
            user(value) {
                if (value != null) {
                    this.$router.push('/');
                }
            }
        },
        methods: {
            onSignIn() {
                console.log(password, this.password, email, this.email);
                this.$store.dispatch('singUserIn', {
                    email: this.email,
                    password: this.password
                }).then(result => {
                    console.log('after login', result);
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }
</script>