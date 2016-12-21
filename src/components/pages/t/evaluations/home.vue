<style lang="stylus" scoped>
  #t-evaluations-home
    padding-left 15px
    padding-right 15px
</style>

<template lang="pug">
  #t-evaluations-home
    h1 Evaluations for {{ $route.params.round_name }}
    ballot-table(:data="data", :error="error", :loading="loading" v-on:refresh="refresh_data")
</template>

<script>
export default {
  name: 't-evaluations-home',
  data () {
    return {
      loading: true,
      error: null,
      data:[
        {
          id: 0,
          name: 'Adjudicator 1',
          time: null,
          url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'evaluations', 'Adjudicator 1'].join('/')
        },
        {
          id: 1,
          name: 'Adjudicator 2',
          time: 100,
          url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'evaluations', 'Adjudicator 2'].join('/')
        },
        {
          id: 2,
          name: 'Adjudicator 3',
          time: null,
          url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'evaluations', 'Adjudicator 3'].join('/')
        },
        {
          id: 3,
          name: 'Adjudicator 4',
          time: 0,
          url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'evaluations', 'Adjudicator 4'].join('/')
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
