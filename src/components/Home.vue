<template>
  <div class="home">
    <!-- <h1 class="home__logo">Keeping Up With The Covid</h1> -->
    <div class="home__logo-grid">
      <div class="home__logo-container-one"></div>
      <div class="home__title-container">
        <h2 class="home__title">Washington's COVID-19 Data and Surveillance Dashboard <br> 
          <span>Data is sourced from Johns Hopkins CSSE</span>
        </h2>
      </div>
    </div>
    <div class="home__united-states">
      <Washington />
      <!-- <News /> -->
      <Map />
      <America />
    </div>

    <div class="home__logo-grid-two">
      <div class="home__logo-container-two"></div>
      <div class="home__title-container">
        <h2 class="home__title-two">World</h2>
      </div>
    </div>
    <div class="home__global">
      <Global />
    </div>
    <div class="home__grid">
      <div class="home__summary">
        <!-- <Summary /> -->
        <SummaryTable />
      </div>
    </div>
  </div>
</template>

<script>
import America from '@/components/data/America'
import Global from '@/components/data/Global'
// import News from '@/components/data/News'
import Washington from '@/components/data/Washington'
import Map from '@/components/data/Map'
import SummaryTable from '@/components/data/SummaryTable'

export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    America,
    Global,
    // News,
    Washington,
    Map,
    SummaryTable
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
    margin: 0px 0px 5px 0px;
  }

  &__logo {
    color: #fff;
  }

  &__logo-grid {
    display: grid;
    grid-template-columns: 100px 1fr;
    height: 68px;
    background-color: #2D3143;
    margin: 0px 0px 5px 0px;
  }
  &__logo-grid-two {
    height: 100px;
    background-color: #2D3143;
    margin: 0px 0px 5px 0px;
    position: relative;
  }

  &__logo-container-one {
    background-image: url('../assets/washington-logo.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
  &__logo-container-two {
    background-image: url('../assets/global.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 100%;
    opacity: 0.1;
  }

  &__title-container {
    display: flex;
    align-items: center;
  }
  
  &__title {
    padding: 5px;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    margin: 0px;
    text-align: left;
  }
  &__title-two {
    padding: 5px;
    border-radius: 4px;
    color: #fff;
    font-size: 36px;
    margin: 0px;
    text-align: left;
    position: absolute;
    top: 50%;  
    left: 50%; 

    transform: translate(-50%, -50%);
  }

  .home__southAfrica--title {
    background-color: #2D3143;
    padding: 5px;
    border-radius: 4px;
    margin: 5px 0px 5px 0px;
    color: #fff;
  }
  
  .home__america--title {
    background-color: #2D3143;
    padding: 5px;
    border-radius: 4px;
    margin: 5px 0px 5px 0px;
    color: #fff;
  }
  .home__america--all {
    background-color: #2D3143;
    padding: 5px;
    border-radius: 4px;
    margin: 0px 0px 5px 0px;
    color: #fff;
  }

  &__united-states {
    display: grid;
    grid-template-columns: 2fr 3fr 1fr;
    grid-gap: 5px;
    margin: 0px 0px 5px 0px;
  }

}
</style>
