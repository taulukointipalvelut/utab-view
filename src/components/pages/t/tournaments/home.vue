<style lang="stylus" scoped>
  #t-tournaments-home
    padding-left 15px
    padding-right 15px
</style>

<template lang="pug">
  #t-tournaments-home
    h1 {{ tournament.name }}
    h2 Rounds
    data-table(title="Round Name", :data="rounds", :error="error", :loading="loading", v-on:refresh="refresh_data", v-on:add="add_data", v-on:delete="delete_data")
</template>

<script>
export default {
  name: 't-tournaments-home',
  data () {
    return {
      loading: true,
      error: null,
      tournament:{
        name: this.$route.params.tournament_name,
        style: 'PDA',
        url: '/' + ['t', this.$route.params.tournament_name].join('/'),
        config_url: '/' + ['t', this.$route.params.tournament_name, 'config'].join('/')
      },
      rounds: [
        {
          id: 0,
          name: 'Round 1',
          url: '/' + ['t', this.$route.params.tournament_name, 'Round 1'].join('/')
        }
      ],
      styles: [
        {
          id: 'PDA',
          name: 'PDA'
        },
        {
          id: 'Asian',
          name: 'Asian'
        },
        {
          id: 'BP',
          name: 'BP (British Parliamentary)'
        },
        {
          id: 'NA',
          name: 'NA (North American)'
        },
        {
          id: 'HEnDA',
          name: 'HEnDA (Academic)'
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
    },
    add_data (new_round_name) {
      this.rounds.push({
        id: 0,
        name: new_round_name,
        url: '/' + ['t', this.$route.params.tournament_name, new_round_name].join('/')
      });
    },
    delete_data (round) {
      this.rounds = this.rounds.filter((el) => el.id !== round.id, this);
    }
  }
}
</script>
