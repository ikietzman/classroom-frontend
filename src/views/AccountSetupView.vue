<template>
  <div class="about">
    <h1>Complete Account Setup</h1>
    <p><input v-if="$store.state.userData != null" type="text" placeholder="Email" v-model="this.$store.state.user.email" disabled /></p>
    <p><input type="text" placeholder="Name" v-model="user.name" /></p>
    <p><input type="text" placeholder="Username" v-model="user.username" /></p>
    <p v-if="errMsg">{{ errMsg }}</p>
    <button @click="setup">Complete</button>
  </div>
</template>


<script>

  import { getAuth } from 'firebase/auth'

  export default {
    data() {
      return {
        user: {
          name: "",
          username: "",
        },
        errMsg: ""
      }
    },
    methods: {
      setup () {
        if (this.name == "" ) {
          this.errMsg = "Name is required"
        }
        else if (this.username == "") {
          this.errMsg = "Username is required"
        }
        else {
          (async () => {
            const res = await fetch('http://127.0.0.1:3000/users/', {
              method: 'POST',
              body: JSON.stringify({
                name: this.user.name,
                username: this.user.username,
                email: this.$store.state.user.email,
                uid: this.$store.state.user.uid
              })
            })
            if (res) {
              this.$router.push("/account")
            }
          })()

        }
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
