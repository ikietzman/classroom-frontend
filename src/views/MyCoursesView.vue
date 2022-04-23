<template>
  <div class="about">
    <nav>
      <router-link to="/account">Account</router-link> |
      <router-link to="/find-courses">Find Courses</router-link> |
      <router-link to="/my-courses">My Courses</router-link>
    </nav>
    <h1>My Courses</h1>

    <div v-for="course, i in courseData" v-bind:key="course.ID">
      <router-link :to="'/my-course/' + this.$store.state.userData.ID + '/course/' + courses[i].ID + '/courseid/' + course.ID">
        {{courses[i].ID}}
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
        courses: [],
        courseData: []
      }
    },
    methods: {
      signOut() {
        getAuth().signOut()
        this.$router.push("/")
      },
      getCourses() {
        return new Promise((resolve, reject) => {
          (async () => {
            const res = await fetch(`http://127.0.0.1:3000/users/${this.$store.state.userData.ID}/courses/0`)
            if (res) {
              const data = await res.json()
              this.courses = data
              resolve()
            }
            else {
              reject()
            }
          })()
        })
      },
      getCourse(courseID) {
        (async () => {
          const res = await fetch(`http://127.0.0.1:3000/courses/${courseID}`)
          if (res) {
            const data = await res.json()
            this.courseData.push(data)
          }
        })()
      }
    },
    created() {
      getAuth().onAuthStateChanged((user) => {
        if (!user) {
          this.$router.push("/login")
        }
        (async () => {
          await this.$store.dispatch('setUser', user )
            .then(() => {
              this.getCourses()
                .then(() => {
                  for (const course of this.courses) {
                    this.getCourse(course.CourseID)
                  }
                })
            })

        })()

      })

    }
  }

</script>
