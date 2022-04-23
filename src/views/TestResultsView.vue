<template>
  <div class="about">
    <h1>Single Test Results</h1>
    <h3>Results</h3>
    <div>
      Date Taken: {{ userTest.CreatedAt }} - Score: {{ score(results) }} / {{ questions.length }}
    </div>
    <div v-for="question, index in questions" :key="question.ID">
    <h4 :style="{color: ( question.Answer == userAnswers[index].Answer ? 'green' : 'red')}">{{ question.Question }}</h4>
    <p>Correct Answer: {{ question.Answer }}</p>
    <p>Your Answer: {{ userAnswers[index].Answer }} </p>
    </div>
  </div>
</template>


<script>

  import { getAuth } from 'firebase/auth'

  export default {
    data() {
      return {
        results: [],
        userAnswers: [],
        userTest: {}
      }
    },
    props: ['tests', 'questions', 'answers', 'answersLength'],
    methods: {
      signOut() {
        getAuth().signOut();
        this.$router.push("/")
      },
      score(answersArray) {
        if (answersArray) {
          return answersArray.reduce((a,b) => {
            return a+b
          })
        }
      },
      dataInit(newUserTestID) {
        let userTest = this.tests.find((test) => {
          return test.ID == newUserTestID
        })
        this.userTest = userTest;

        let answers = this.answers.filter((a) => {
          return a.UserTestID == this.userTest.ID
        });

        this.userAnswers = answers
        let key = []
        for (let answer of answers) {
          let question = this.questions.find((q) => {
            return q.ID == answer.question_id
          })
          key.push(Number(question.Answer == answer.Answer))
        }

        this.results = []
        this.results.push(...key)
      }
    },
    created() {
      let userTest = this.tests.find((test) => {
        return test.ID == this.$route.params.usertestid
      })

      this.userTest = userTest;

      let answers = this.answers.filter((a) => {
        return a.UserTestID == this.userTest.ID
      });

      this.userAnswers = answers

      let key = []
      for (let answer of answers) {
        let question = this.questions.find((q) => {
          return q.ID == answer.QuestionID
        })
        key.push(Number(question.Answer == answer.Answer))
      }
      this.results = []
      this.results.push(...key)

    },
    beforeRouteUpdate(to) {
      this.dataInit(to.params.usertestid)
    }
  }

</script>
<style scoped>
  h4 {
    color: green;
  }
</style>
