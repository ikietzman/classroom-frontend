<template>
  <div class="about">
    <h1>Single Course Test</h1>
    <div>
      <h2>{{ test.Name }}</h2>
      <p>{{ test.Description }}</p>
    </div>
    <router-link :to="`/test/${test.ID}/course/${this.$route.params.usercourseid}/courseid/${this.$route.params.courseid}`"><button>Take Test</button></router-link>
    <h3>Results</h3>
    <div v-for="usertest, index in tests" :key="usertest.ID">
      <router-link :to="`/my-course/${this.$route.params.id}/course/${this.$route.params.usercourseid}/courseid/${this.$route.params.courseid}/test/${this.$route.params.testid}/results/${usertest.ID}`"> {{usertest.ID}}Date Taken: {{ test.CreatedAt }} - Score: {{ score(this.results[index]) }} / {{ this.questions.length }}</router-link>
    </div>
    <router-view :key="$route.fullPath" :questions="questions" :answers="answers" :tests="tests" :answersLength="answers.length"></router-view>
  </div>
</template>


<script>

  import { getAuth } from 'firebase/auth'

  export default {
    data() {
      return {
        test: {},
        tests: [],
        questions: [],
        answers: [],
        results: [],
        resultsStatus: 0
      }
    },
    methods: {
      signOut() {
        getAuth().signOut();
        this.$router.push("/")
      },
      computeScores() {
        if (this.answers) {
          for (let test in this.tests) {
            let answers = this.answers.filter((a) => {
              return a.UserTestID == this.tests[test].ID
            });

            let key = []
            for (let answer of answers) {
              let question = this.questions.find((q) => {
                return q.ID == answer.QuestionID
              })
              key.push(Number(question.Answer == answer.Answer))
            }
            this.results.push(key)
          }
        }
      },
      score(answersArray) {
        if (answersArray) {
          return answersArray.reduce((a,b) => {
            return a+b
          })
        }
      }
    },
    watch: {
      resultsStatus(newStatus) {
        if (newStatus == this.tests.length) {
          this.computeScores();
        }
      }
    },
    created() {

      this.$store.watch(
        (state) => {
          if (state.selectedCourseTestStatus == 1 && this.$store.state.userDataStatus) {
            let i = this.$store.state.selectedCourseTest.findIndex((test) => {
              return test.ID == this.$route.params.testid;
            })
            this.test = this.$store.state.selectedCourseTest[i];
            (async () => {
                const res = await fetch(`http://127.0.0.1:3000/user/${this.$store.state.userData.ID}/tests/${this.$route.params.testid}`)
                if (res) {
                  this.tests = await res.json()
                  this.answers = []
                  for (let test of this.tests) {
                    (async () => {
                      const res = await fetch(`http://127.0.0.1:3000/user/${this.$store.state.userData.ID}/test/${test.ID}/questions`)
                      if (res) {
                        let a = await res.json()
                        this.answers.push(...a)
                        this.resultsStatus++
                      }
                    })();
                  }
                }
            })();

            (async () => {
              const res = await fetch(`http://127.0.0.1:3000/test/${this.test.ID}/questions`)
              if (res) {
                let q = await res.json()
                this.questions= q
              }
            })();
          }
        }
      );
    },
  }

</script>
