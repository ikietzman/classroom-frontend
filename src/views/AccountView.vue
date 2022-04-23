<template>
  <div class="about">
    <nav>
      <router-link to="/account">Account</router-link> |
      <router-link to="/find-courses">Find Courses</router-link> |
      <router-link to="/my-courses">My Courses</router-link>
    </nav>
    <h1>Account</h1>
    <p v-if="$store.state.userData != null">Email: <input type="text" placeholder="Email" v-model="$store.state.userData.email" disabled /></p>
    <p v-if="$store.state.userData != null">Username: <input type="text" placeholder="Username" v-model="$store.state.userData.username" /></p>
    <p v-if="$store.state.userData != null">Name: <input type="text" placeholder="Name" v-model="$store.state.userData.name" /></p>

    <button @click="update">Update</button>
    <button @click="signOut">Logout</button>
    <button @click="resetPassword">Send Password Reset Email</button>
    <div>
      <button @click="deleteUser">Delete Account</button>
    </div>
  </div>
</template>


<script>

  import { getAuth, deleteUser, sendPasswordResetEmail } from 'firebase/auth'

  export default {
    data() {
      return {

      }
    },
    methods: {
      signOut() {
        getAuth().signOut()
        this.$router.push("/")
      },
      update() {
        console.log('updating');
        (async () => {
          const res = await fetch(`http://127.0.0.1:3000/users/${this.$store.state.userData.ID}`, {
            method: 'PATCH',
            body: JSON.stringify(this.$store.state.userData)
          })
          if (res) {
            console.log(await res.text())
          }
        })()
      },
      resetPassword() {
        sendPasswordResetEmail(getAuth(), this.$store.state.userData.email)
          .then(() => {
            console.log('reset password email sent')
          })
          .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            console.log(errorCode)
            console.log(errorMessage)
            // ..
          })
      },
      deleteUser() {
        (async () => {
          const res = await fetch(`http://127.0.0.1:3000/users/${this.$store.state.userData.ID}`, {
            method: 'DELETE'
          })
          if (res) {
            console.log(await res.text())
          }
        })()
        deleteUser(getAuth().currentUser).
          then( () => {
            console.log('user deleted')
          })
          .catch( (err) => {
            console.log(err)
          })
      }

    },
    created() {
      getAuth().onAuthStateChanged((user) => {
        if (!user) {
          this.$router.push("/login")
        }
        this.$store.dispatch('setUser', user )
      })

    }
  }

</script>
