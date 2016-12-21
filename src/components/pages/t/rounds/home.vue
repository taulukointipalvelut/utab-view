<style lang="stylus" scoped>
  #t-rounds-home
    padding-left 15px
    padding-right 15px
</style>

<template lang="pug">
  #t-rounds-home
    h1 {{ round.name }}
    p
      router-link(v-if="latest_draw", :to="latest_draw.url") Show Latest Draw
      br
      router-link(v-if="show_latest_ballot", :to="latest_ballot") Enter Latest Ballot
      br
      router-link(v-if="show_latest_evaluation", :to="latest_evaluation") Enter Latest Evaluation
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
          url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'draws', 'Draw 0'].join('/')
        }
      ],
      show_latest_ballot: true,
      latest_ballot: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'ballots'].join('/')
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
