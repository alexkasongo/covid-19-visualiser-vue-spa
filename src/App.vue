<template>
  <div id="app">
    <img class="logo" alt="Vue logo" src="https://images.unsplash.com/photo-1584168054713-0d212ed95783?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <Home msg="Welcome to Aleko's Covid-19 statistics"/>
    <Summary />
  </div>
</template>

<script>
// import Summary from './components/data/Summary';
import Home from './components/Home.vue'
export default {
  name: 'App',
  components: {
    Home
    // Summary
  }
}
</script>

<style lang="scss">
body {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
