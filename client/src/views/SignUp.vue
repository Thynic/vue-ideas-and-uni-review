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

    <v-card-title>Register</v-card-title>

    <div>
      <v-banner
      id="unique-message"
      >{{uniqueMessage}}
      </v-banner>
    </div>

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

    <v-text-field
        v-model="passwordAgain"
        :rules="[rules.length(2)]"
        filled
        color="deep-purple"
        label="Password Again"
        style="min-height: 96px"
        type="password"
        @change="checkPassMatch"
    ></v-text-field>
      
      <v-checkbox
        v-model="agreement"
        color="deep-purple"
      >
        <template v-slot:label>
          I agree to the&nbsp;
          <a
            href="#"
          >Terms of Service</a>
          &nbsp;and&nbsp;
          <a
            href="#"
          >Privacy Policy</a>*
        </template>
      </v-checkbox>

      <div class="text-right">

      <v-btn
        class="white--text"
        color="deep-purple accent-4"
        depressed
        type="submit"
        @click="_createUser"
      >
        Submit
      </v-btn>

      </div>



      <v-alert
        class="text-center"
        id = "status"
        v-model="alert"
        type="success"
        transition="scale-transition"
        > User Created!
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
      <router-link to="/">
      <v-btn
        :disabled="!form"
        :loading="isLoading"
        class="white--text"
        color="deep-purple accent-4"
        depressed
      >
        Login Instead
      </v-btn>
      </router-link>
    </v-card-actions>
  </v-card>

</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import axios from 'axios'

export default {
    name: 'Sign Up',
    created() {
      this.setTitle({
        title: 'Sign Up'
      }) 
    },
    methods: {
        ...mapMutations(['setTitle']),
        ...mapMutations(['setPassword']),
        ...mapMutations(['setUser']),
        ...mapActions(['createUser']),
        checkPassMatch(event) {
            if (this.password == this.passwordAgain) {
                this.passwordMatch = true
            }
        },
        async _createUser(e) {
            e.preventDefault()
            this.uniqueMessage = ''
            await this.usernameExists()
            if(this.passwordMatch && this.usernameUnique) {
                this.setUser({
                    username: this.username,
                    password: this.password
                })
                this.createUser()

                this.alert = !this.alert

                // const statusDiv = document.getElementById('status')
                // statusDiv.innerHTML = ""
            } else if(!this.usernameUnique) {
              this.usernameUnique = true
            }
        },
        async usernameExists() {
          let isMatch
          await axios.get(
            'http://localhost:8081/users'
          ).then((users) => {
            
            isMatch = users.data.find(user => user.username == this.username)

            if (isMatch) {
              this.usernameUnique = false
              this.uniqueMessage = 'Username already exists.'    
            } 
          })
        }
    },
    computed: {
      ...mapState(['title']),
      ...mapState(['passwordForm']),
    },
    data: () => ({
      agreement: false,
      dialog: false,
      username: '',
      form: false,
      isLoading: false,
      password: '',
      phone: undefined,
      passwordAgain: '',
      passwordMatch: false,
      uniqueMessage: '',
      usernameUnique: true,
      alert: false,
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
#unique-message {
  color: red;
}

#status {
  margin-top: 2%;
  /* float: right; */
  /* max-width: 180px; */
}

#vcard {
  width: 500px;
}

 /* html,body { width:100%; } */
</style>