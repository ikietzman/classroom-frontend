<template>
  <div class="about">
    <h1>{{ test.Name }}</h1>
    <p>{{ test.Description }}</p>
    <div v-for="question, index in questions" :key="question.ID">
      <h4>{{ question.Question }}</h4>
      <div>
        <input type="radio" id="one" :value="question.Option1" v-model="userAnswers[index]" />
        <label for="one">{{ question.Option1 }}</label>
      </div>
      <div>
        <input type="radio" id="two" :value="question.Option2" v-model="userAnswers[index]" />
        <label for="two">{{ question.Option2 }}</label>
      </div>
      <div>
        <input type="radio" id="three" :value="question.Option3" v-model="userAnswers[index]" />
        <label for="three">{{ question.Option3 }}</label>
      </div>
      <div>
        <input type="radio" id="four" :value="question.Option4" v-model="userAnswers[index]" />
        <label for="four">{{ question.Option4 }}</label>
      </div>
    </div>
    <button @click="submit">Submit</button><button @click="abort">Abort</button>

  </div>
</template>


<script>

  import { getAuth } from 'firebase/auth'

  export default {
    data() {
      return {
        questions: [],
        userAnswers: [],
        test: {},
        userTestID: null
      }
    },
    methods: {
      signOut() {
        getAuth().signOut();
        this.$router.push("/")
      },
      abort() {
        this.$router.push(`/my-courses`)
      },
      submit() {
        (async () => {
          const res = await fetch(`http://127.0.0.1:3000/user/${this.$store.state.userData.ID}/tests/${this.$route.params.testid}`, {
            method: 'POST',
            body: {}
          });
          if (res) {
            const data = await res.json();
            this.userTestID = data.ID

            for (let answer in this.userAnswers) {
              const res = await fetch(`http://127.0.0.1:3000/user/${this.$store.state.userData.ID}/test/${this.userTestID}/question`, {
                method: 'POST',
                body: JSON.stringify({
                  Answer: this.userAnswers[answer],
                  QuestionID: this.questions[answer].ID
                })
              })
              if (res) {
                const data = await res.json()
                console.log(data)

                this.$router.push("/my-courses")
              }
            }

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
      });

      (async () => {
        console.log(`http://127.0.0.1:3000/test/${this.$route.params.testid}`);
        const res = await fetch(`http://127.0.0.1:3000/test/${this.$route.params.testid}`);
        if (res) {
          const test = await res.json();
          console.log(test);
          this.test = test
        }
      })();

      (async () => {
        console.log(`http://127.0.0.1:3000/test/${this.$route.params.testid}/questions`);
        const res = await fetch(`http://127.0.0.1:3000/test/${this.$route.params.testid}/questions`);
        if (res) {
          const questions = await res.json();
          console.log(questions);
          this.questions = questions
          this.userAnswers = new Array(questions.length)
        }
      })();
    },
  }

</script>
