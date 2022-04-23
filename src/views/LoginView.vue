<template>
  <div class="about">
    <h1>Login</h1>
    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <p><button @click="signIn">Submit</button></p>
    <p><button><router-link to="/resetpassword">Forgot Password?</router-link></button></p>
  </div>
</template>

<script>

  import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

  export default {
    data() {
      return {
        email: "",
        password: "",
        errMsg: ""
      }
    },
    methods: {
      signIn() {
        if (this.email == "" ) {
          this.errMsg = "Email is required"
        }
        else if (this.password == "") {
          this.errMsg = "Password is required"
        }
        else {
          const auth = getAuth()
          signInWithEmailAndPassword(auth, this.email, this.password)
          .then((response) => {
            console.log('Successfully signed in!')
            console.log(response)
            this.$router.push('/account')
          })
          .catch(error => {
            console.log(error.code)
            console.log(error.message)
            switch (error.code) {
              case "auth/invalid-email":
                this.errMsg = "Invalid email address"
                break
              case "auth/user-not-found":
                this.errMsg = "Username not found"
                break
              case "auth/wrong-password":
                this.errMsg = "Incorrect password"
                break
              default:
                this.errMsg = "He's dead, Jim"
            }
          })
        }
      }
    },
    created() {
      getAuth().onAuthStateChanged((user) => {
        if (user) {
          this.$router.push('/account')
        }
      })
    }
  }

</script>
