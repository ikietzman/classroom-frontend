<template>
  <div class="about">
    <nav>
      <router-link to="/account">Account</router-link> |
      <router-link to="/find-courses">Find Courses</router-link> |
      <router-link to="/my-courses">My Courses</router-link>
    </nav>
    <h1>Find Courses</h1>

    <div v-for="course in courses" v-bind:key="course.ID">
      <router-link :to="'/course/' + course.ID">
        <h2>{{ course.Name }}</h2>
        <p>{{ course.Description }}</p>
      </router-link>
    </div>

    <button @click="signOut">Logout</button>
  </div>
</template>


<script>

  import { getAuth } from 'firebase/auth'

  export default {
    data() {
      return {
        courses: []
      }
    },
    methods: {
      signOut() {
        getAuth().signOut()
        this.$router.push("/")
      },
      getCourses() {
        (async () => {
          const res = await fetch('http://127.0.0.1:3000/courses/')
          if (res) {
            const data = await res.json()
            this.courses = data
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
