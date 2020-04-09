<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/washington-logo.png"> -->
    <!-- <Home msg="Welcome to Aleko's Covid-19 statistics"/> -->
    <Home/>
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
  background-color: #1C1F2B;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #eee;
  // color: #2c3e50;
}

.logo {
  height: 300px;
}
</style>
