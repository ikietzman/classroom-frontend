<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      A basic virtual classroom application using:<br>
      Frontend: Vue + Vue Router + Vuex + Firebase Auth<br>
      Backend: Go + Chi + Gorm+MySQL
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
