<style lang="stylus" scoped>
  #t-rounds-home
    padding-left 15px
    padding-right 15px
</style>

<template lang="pug">
  #t-rounds-home
    h1 {{ round.name }}
</template>

<script>
export default {
  name: 't-rounds-home',
  data () {
    return {
      loading: true,
      error: null,
      round: {
          id: 0,
          name: 'Round 1',
          url: '/' + ['t', this.$route.params.tournament_name, 'Round 1'].join('/'),
          config_url: '/' + ['t', this.$route.params.tournament_name, 'Round 1', 'config'].join('/')
        }
    }
  },

  created () {
    this.refresh_data()
  },
  watch: {
    '$route': 'refresh_data'
  },
  methods: {
    refresh_data () {
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
      }, 500);
    }
  }
}
</script>
