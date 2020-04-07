<template>
  <div class="home">
    <h1 class="home__logo">Keeping Up With The Covid</h1>
    <h2 class="home__title">Global Summary</h2>
    <div class="home__global">
      <Global />
    </div>
    <div class="home__grid">
      <div class="home__southAfrica">
        <h2 class="home__southAfrica--title">South Africa</h2>
        <SouthAfrica />
      </div>
      <div class="home__america">
        <h2 class="home__america--title">United States - Washington</h2>
        <America />
      </div>
      <div class="home__summary">
        <h2 class="home__america--all">All Countries</h2>
        <Summary />
      </div>
      <div class="home__news">
        <h2 class="home__america--all">News</h2>
        <News />
      </div>
    </div>
  </div>
</template>

<script>
import Summary from '@/components/data/Summary'
import America from '@/components/data/America'
import SouthAfrica from '@/components/data/SouthAfrica'
import Global from '@/components/data/Global'
import News from '@/components/data/News'

export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    Summary,
    America,
    SouthAfrica,
    Global,
    News,
  },
  data() {
    return{

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.home {
  
  max-width: 1200px;
  margin: 0px auto;

  &__global {
    display: flex;
    justify-content: center;
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    max-width: 1200px;
    margin: 0px auto;
  }

  &__logo {
    color: #fff;
  }
  
  &__title {
    background-color: #2D3143;
    padding: 10px;
    border-radius: 4px;
    margin: 0px 0px 10px 0px;
    color: #fff;
  }

  .home__southAfrica--title {
    background-color: #2D3143;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0px 10px 0px;
    color: #fff;
  }
  
  .home__america--title {
    background-color: #2D3143;
    padding: 10px;
    border-radius: 4px;
    margin: 10px 0px 10px 0px;
    color: #fff;
  }
  .home__america--all {
    background-color: whitesmoke;
    padding: 10px;
    border-radius: 4px;
    margin: 0px 0px 10px 0px;
  }

}
</style>
