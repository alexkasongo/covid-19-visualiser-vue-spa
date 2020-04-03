<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <Summary />
  </div>
</template>

<script>
import Summary from '@/components/data/Summary'

export default {
  name: 'Home',
  props: {
    msg: String
  },
  components: {
    Summary
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
