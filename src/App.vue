<template>
  <div id="app">
    <Home/>
    <div class="app__footer">
      <p>© 2020 Alex Kasongo</p>
      <div class="app__footer-links">
        <a href="https://github.com/alexkasongo/covid-19-visualiser" target="_blank">
          <img src="./assets/github.png" alt="github">
        </a>
        <a href="https://www.linkedin.com/in/alex-kasongo-9781016b/" target="_blank">
          <img src="./assets/linkedIn.png" alt="linkedIn">
        </a>
        <a href="https://www.instagram.com/alexkasongo/" target="_blank">
          <img src="./assets/instagram.png" alt="instagram">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue'
export default {
  name: 'App',
  components: {
    Home
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
}

.logo {
  height: 300px;
}

.app {
  &__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 10px;
  }
  &__footer-links {
    img {
      height: 32px;
      padding: 0px 5px;
    }
  }
}
</style>
