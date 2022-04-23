<template>
  <div class="about">
    <nav>
      <router-link to="/account">Account</router-link> |
      <router-link to="/find-courses">Find Courses</router-link> |
      <router-link to="/my-courses">My Courses</router-link>
    </nav>
    <h1>Find Courses</h1>
    <div>
      <h2>{{ course.Name }}</h2>
      <p>{{ course.Description }}</p>
      <button @click="register">Register for This Course</button>
    </div>
    <button @click="signOut">Logout</button>
  </div>
</template>


<script>

  import { getAuth } from 'firebase/auth'

  export default {
    data() {
      return {
        course: {}
      }
    },
    methods: {
      signOut() {
        getAuth().signOut()
        this.$router.push("/")
      },
      register() {
        (async () => {
          const res = await fetch(`http://127.0.0.1:3000/users/${this.$store.state.userData.ID}/courses/${this.course.ID}`, {
            method: 'POST',
            body: {}
          })
          if (res) {
            const data = await res.text()
            this.course = data
            this.$router.push("/my-courses")
          }
        })()
      },
      getCourses() {
        (async () => {
          const res = await fetch(`http://127.0.0.1:3000/courses/${this.$route.params.id}`);
          if (res) {
            const data = await res.json()
            this.course = data
          }
        })()
      }
    },
    created() {
      getAuth().onAuthStateChanged((user) => {
        if (!user) {
          this.$router.push("/login")
        }
        this.$store.dispatch('setUser', user )
        this.getCourses()
      })

    }
  }

</script>
