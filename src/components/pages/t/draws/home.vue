<style lang="stylus" scoped>
  #t-draws-home
    padding-left 15px
    padding-right 15px
</style>

<template lang="pug">
  #t-draws-home
    h1 {{ draw.name }}
    draw-table(:squares="squares", :error="error", :loading="loading" v-on:refresh="refresh_data")
</template>

<script>
export default {
  name: 't-draws-home',
  data () {
    return {
      loading: true,
      error: null,
      draw:{
        id: 0,
        name: this.$route.params.draw_name,
        url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'draws', this.$route.params.draw_name].join('/'),
        config_url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'draws', this.$route.params.draw_name, 'config'].join('/')
      },
      squares: [
        {
          id: 0,
          venue: 'H-302',
          teams: ['Team A', 'Team B'],
          chairs: [],
          panels: [],
          trainees: [],
          warnings: []
        }
      ]
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
    add_data (new_round_name) {
      this.rounds.push({
        id: 0,
        name: new_round_name,
        url: '/' + ['t', this.$route.params.tournament_name, new_round_name].join('/')
      });
    },
    delete_data (round) {
      this.rounds = this.rounds.filter((el) => el.id !== round.id, this);
    }*/
  }
}
</script>
