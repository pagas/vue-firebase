<template>
    <form class="form-horizontal" @submit.prevent="onSignUp()">
        <fieldset>
            <div id="legend">
                <legend class="">Sing Up</legend>
            </div>
            <div class="control-group">
                <!-- Username -->
                <label class="control-label" for="name">Name</label>
                <div class="controls">
                    <input type="text" v-model="name" id="name" name="email" placeholder="" required>
                </div>
            </div>

            <div class="control-group">
                <!-- Username -->
                <label class="control-label" for="email">Email</label>
                <div class="controls">
                    <input type="email" v-model="email" id="email" name="email" placeholder="" required>
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
                <!-- Password-->
                <label class="control-label" for="confirmPassword" >Confirm Password</label>
                <div class="controls">
                    <input type="password" v-model="confirmPassword" id="confirmPassword" name="password" placeholder="" required>
                </div>
                <div class="label label-danger" v-if="comparePasswords">
                    {{comparePasswords}}
                </div>
            </div>

            <div class="control-group">
                <!-- Button -->
                <div class="controls">
                    <input type="submit" class="btn btn-success" value="SingUp">
                </div>
            </div>
        </fieldset>
    </form>
</template>

<script>
    export default {
        data() {
            return{
                name: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        },
        computed: {
          // do some password comparison or other calculations
            user() {
                return this.$store.getters.user;
            },
            comparePasswords() {
                return this.password !== this.confirmPassword ? 'Password do no match' : '';
            }
        },
        watch: {
            user(value) {
                if (value != null) {
                    this.$router.push('/properties');
                }
            }
        },
        methods: {
            onSignUp() {
                this.$store.dispatch('singUserUp', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }).then(result => {
                }).catch(error => {
                    alert(error.message);
                });
            }
        }
    }
</script>