<template>
  <div class="about">
    <h1>Reset Password</h1>
    <p>Email: <input type="text" placeholder="Email" v-model="this.email" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <button @click="resetPassword">Send Password Reset Email</button>
  </div>
</template>


<script>

  import { getAuth, sendPasswordResetEmail } from 'firebase/auth'

  export default {
    data() {
      return {
        email: null,
        errMsg: null
      }
    },
    methods: {
      resetPassword() {
        sendPasswordResetEmail(getAuth(), this.email)
          .then(() => {
            this.errMsg = 'Reset password email sent'
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
            switch (error.code) {
              case "auth/missing-email":
                this.errMsg = "Email address required"
                break
              case "auth/invalid-email":
                this.errMsg = "Invalid email address"
                break
              case "auth/user-not-found":
                this.errMsg = "User not found"
                break
              default:
                this.errMsg = `He's dead, Jim. Our Auth provider says: ${error.message}`
            }
          })
      }

    }
  }

</script>
