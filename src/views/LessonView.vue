<template>
  <div class="about">
    <h1>Single Course Lesson</h1>
    <div>
      <h2>{{ lesson.Name }}</h2>
      <p>{{ lesson.Description }}</p>
      <p>{{ lesson.Content }}</p>
    </div>
  </div>
</template>


<script>

  import { getAuth } from 'firebase/auth'

  export default {
    data() {
      return {
        lesson: {}
      }
    },
    methods: {
      signOut() {
        getAuth().signOut()
        this.$router.push("/")
      },
    },
    created() {
      this.$store.watch(
        (state) => {
          if (state.selectedCourseLessonsStatus == 1) {
            let i = this.$store.state.selectedCourseLessons.findIndex((lesson) => {
              return lesson.ID == this.$route.params.lessonid
            })
            this.lesson = this.$store.state.selectedCourseLessons[i]
          }
        }
      )
    },
    beforeRouteUpdate(to) {
      let i = this.$store.state.selectedCourseLessons.findIndex((lesson) => {
        return lesson.ID == to.params.lessonid
      })
      this.lesson = this.$store.state.selectedCourseLessons[i]
    }
  }

</script>
