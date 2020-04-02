<template>
  <div class="hello">
    <h1>{{ summary }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  props: {
    msg: String
  },
  data() {
    return{
        summary: null,
    }
  },
  mounted () {
    this.$http
      .get('https://api.covid19api.com/summary')
      .then(response => {
          this.summary = response
          console.log(`Home.vue - 23 - data`, this.summary);
      }
    )
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
