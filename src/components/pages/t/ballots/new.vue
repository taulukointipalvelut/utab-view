<style lang="stylus" scoped>
  #t-ballots-enter-home
    padding-left 15px
    padding-right 15px
  h1 small
    color gray
</style>

<template lang="pug">
  #t-ballots-enter-home
    h1 Ballot for {{ $route.params.round_name }}&nbsp;
      small by {{ $route.params.adjudicator_name }}
    <!-- show progress -->
    router-view/
</template>

<script>
export default {
  name: 't-ballots-enter-home',
  data () {
    return {
      loading: true,
      error: null,
      schema: {
        side_names: [
          {
            short_name: 'Gov',
            long_name: 'Government',
            roles: [
              {
                short_name: 'PM',
                long_name: 'Prime Minister'
              },
              {
                short_name: 'MG',
                long_name: 'Member of Government'
              },
              {
                short_name: 'GR',
                long_name: 'Government Reply'
              }
            ]
          },
          {
            short_name: 'Opp',
            long_name: 'Opposition',
            roles: [
              {
                short_name: 'LO',
                long_name: 'Leader of Opposition'
              },
              {
                short_name: 'MO',
                long_name: 'Member of Opposition'
              },
              {
                short_name: 'GO',
                long_name: 'Opposition Reply'
              }
            ]
          }
        ],
        score_range: {
          matter: {
            min: 1,
            max: 10
          },
          manner: {
            min: 1,
            max: 10
          }
        },
        user_defined_data: [
          {
            key: 'poi_score',
            title: 'POI Score',
            type: Number,
            validator: (v) => (v >= 0) ? 1 : 'should be a positive number'
          },
          {
            key: 'best_debaters',
            title: 'Best Speakers',
            type: Array,
            validator: (v) => (v.length > 0 && v.length <= 3) ? 1 : 'should be 1-3 speaker(s)'
          }
        ]
      },
      data: {
        teams: [
          {
            name: 'Team A',
            score: 0,
            side: 0,
            speakers: [
              {
                name: 'Speaker 1',
                scores: {
                  matter: 0,
                  manner: 0,
                  user_defined_data: null
                }
              },
              {
                name: 'Speaker 2',
                scores: {
                  matter: 0,
                  manner: 0,
                  user_defined_data: null
                }
              },
              {
                name: 'Speaker 3',
                scores: {
                  matter: 0,
                  manner: 0,
                  user_defined_data: null 
                }
              }
            ]
          },
          {
            name: 'Team B',
            score: 0,
            side: 1,
            speakers: [
              {
                name: 'Speaker 4',
                scores: {
                  matter: 0,
                  manner: 0,
                  user_defined_data: null
                }
              },
              {
                name: 'Speaker 5',
                scores: {
                  matter: 0,
                  manner: 0,
                  user_defined_data: null
                }
              },
              {
                name: 'Speaker 6',
                scores: {
                  matter: 0,
                  manner: 0,
                  user_defined_data: null 
                }
              }
            ]
          }
        ]
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
    },
    add_data (new_datum_name) {
      this.data.push({
        id: 0,
        version: '20161216000000',
        time: Date.now().toISOString(),
        url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'ballots', 'Adjudicator 1', datenow_iso].join('/')
      });
    },
    delete_data (datum) {
      this.data = this.data.filter((el) => el.id !== datum.id, this);
    }
  }
}
</script>
