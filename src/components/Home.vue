<template>
  <div class="home">
    <h1>Keeping Up With The Covid</h1>
    <h2 class="home__title">Global Summary</h2>
    <div class="home__global">
      <Global />
    </div>
    <!-- <Summary /> -->
    <div class="home__grid">
      <div class="home__southAfrica">
        <h2>South Africa</h2>
        <SouthAfrica />
      </div>
      <div class="home__america">
        <h2 class="chart__type">United States - Washington</h2>
        <America />
      </div>
    </div>
  </div>
</template>

<script>
// import Summary from '@/components/data/Summary'
import America from '@/components/data/America'
import SouthAfrica from '@/components/data/SouthAfrica'
import Global from '@/components/data/Global'

export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    // Summary,
    America,
    SouthAfrica,
    Global
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
  
  &__title {
    background-color: seagreen;
    padding: 10px;
    border-radius: 8px;
    margin: 0px;
  }

}
</style>
