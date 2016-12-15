<style lang="stylus" scoped>
  #t-rounds-home
    padding-left 15px
    padding-right 15px
</style>

<template lang="pug">
  #t-rounds-home
    h1 {{ round.name }}
    router-link(v-if="latest_draw", :to="latest_draw.url") Latest Draw
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
        name: this.$route.params.round_name,
        url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name].join('/'),
        config_url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'config'].join('/')
      },
      draws: [
        {
          id: 0,
          name: 'Draw 0',
          url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'Draw 0'].join('/')
        }
      ],
      dd: ['hi']
    }
  },

  computed: {
    latest_draw () {
      return this.draws[this.draws.length -1];
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
    }/*,
    add_data (new_draw_name) {
      this.draws.push({
        id: 0,
        name: new_draw_name,
        url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, new_draw_name].join('/')
      });
    },
    delete_data (draw) {
      this.draws = this.draws.filter((el) => el.id !== draw.id, this);
    }*/
  }
}
</script>
