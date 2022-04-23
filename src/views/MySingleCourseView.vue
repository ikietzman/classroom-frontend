<template>
  <div class="about">
    <nav>
      <router-link to="/account">Account</router-link> |
      <router-link to="/find-courses">Find Courses</router-link> |
      <router-link to="/my-courses">My Courses</router-link>
    </nav>
    <h1>Single Course</h1>
    <div>
      <h2>{{ course.Name }}</h2>
      <p>{{ course.Description }}</p>
      <h3>Course Lessons</h3>
      <div v-for="lesson in this.$store.state.selectedCourseLessons" :key="lesson.id">
        <router-link :to="`/my-course/${this.$route.params.id}/course/${this.$route.params.usercourseid}/courseid/${this.$route.params.courseid}/lesson/${lesson.ID}`"><p><strong>{{ lesson.Name }}</strong> - {{ lesson.Description }}</p></router-link>
      </div>
      <h3>Course Tests</h3>
      <div v-for="test in this.$store.state.selectedCourseTest" :key="test.id">
        <router-link :to="`/my-course/${this.$route.params.id}/course/${this.$route.params.usercourseid}/courseid/${this.$route.params.courseid}/test/${test.ID}`"><p><strong>{{ test.Name }}</strong> - {{ test.Description }}</p></router-link>
      </div>
      <button @click="unregister">Unregister for This Course</button>
    </div>
    <router-view v-if="this.$store.state.selectedCourse"></router-view>
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
      unregister() {
        (async () => {
          const res = await fetch(`http://127.0.0.1:3000/users/${this.$store.state.userData.ID}/courses/${this.$route.params.usercourseid}`, {
            method: 'DELETE',
            body: {}
          })
          if (res) {
            this.$router.push("/my-courses")
          }
        })()
      },
      getCourse() {
        (async () => {
          const res = await fetch(`http://127.0.0.1:3000/courses/${this.$route.params.courseid}`)
          if (res) {
            const course = await res.json()
            this.course = course
            this.$store.dispatch('setSelectedCourse', course)
              .then(() => {
                  this.$store.dispatch('setSelectedCourseLessons', this.$store.state.selectedCourse )
                  this.$store.dispatch('setSelectedCourseTest', this.$store.state.selectedCourse )
              })
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
        this.getCourse()
      })

    }
  }

</script>
