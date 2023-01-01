<template>
    
<v-card id="vcard"
    class="mx-auto"
    style="max-width: 500px;"
  >

    <v-form
      ref="form"
      v-model="form"
      class="pa-4 pt-6"
    >

    <v-card-title>Login</v-card-title>

    <v-text-field
        v-model="username"
        filled
        color="deep-purple"
        label="Username"
        type="text"
      ></v-text-field>
      <v-text-field
        v-model="password"
        :rules="[rules.length(2)]"
        filled
        color="deep-purple"
        label="Password"
        style="min-height: 96px"
        type="password"
      ></v-text-field>

      <div class="text-right">
      <v-btn
        class="white--text"
        color="deep-purple accent-4"
        depressed
        type="submit"
        @click="_login"
      >
        Submit
      </v-btn>
      </div>

      <v-alert
        class="text-center"
        id="login-alert"
        v-model="err"
        type="warning"
        transition="scale-transition"
      >
        {{loginMessage}}
      </v-alert>

    </v-form>


    <v-divider></v-divider>
    <v-card-actions>
      <v-btn
        text
        @click="$refs.form.reset()"
      >
        Clear
      </v-btn>
      <v-spacer></v-spacer>
      <router-link to="/signup">
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
      >
        Sign Up Instead
      </v-btn>
      </router-link>
    </v-card-actions>

  </v-card>

</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
    name: 'Login',
    created() {
      this.setTitle({
        title: 'Login'
      })
    },
    methods: {
      ...mapMutations(['setTitle']),
      ...mapActions(['login']),
      ...mapMutations(['setLoginCreds']),
      async _login(e) {
        e.preventDefault()
        this.setLoginCreds({
          username: this.username,
          password: this.password
        })
        this.login().then((response) => {
            if (response == 'Password or username is wrong.') {
              this.err = !this.err
              this.loginMessage = response
            }

        })
        
      }
    },
    computed: {
      ...mapState(['title']),
      ...mapState(['loginStatus'])
    },
    data: () => ({
      agreement: false,
      dialog: false,
      username: undefined,
      form: false,
      isLoading: false,
      password: undefined,
      phone: undefined,
      loginMessage: '',
      err: false,
      rules: {
        length: len => v => (v || '').length >= len || `Invalid character length, required ${len}`,
        password: v => !!(v || '').match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
          'Password must contain an upper case letter, a numeric character, and a special character',
        required: v => !!v || 'This field is required',
      },
  }),
}
</script>

<style scoped>

#vcard {
  width: 500px;
}

#login-alert {
  margin-top: 2%;
}

</style>