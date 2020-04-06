<template>
  <div class="home">
    <h1>Keeping Up With The Covid</h1>
    <!-- <h1>{{ msg }}</h1> -->
    <SouthAfrica />
    <America />
    <Summary />
  </div>
</template>

<script>
import Summary from '@/components/data/Summary'
import America from '@/components/data/America'
import SouthAfrica from '@/components/data/SouthAfrica'

export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    Summary,
    America,
    SouthAfrica
  },
  data() {
    return{

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
