<style lang="stylus" scoped>
  #t-ballots-adjudicator
    padding-left 15px
    padding-right 15px
  li.visited:last-of-type em
    color #96c03d
</style>

<template lang="pug">
  #t-ballots-adjudicator
    h1 Ballot for {{ $route.params.round_name }}&nbsp;
      small by {{ $route.params.adjudicator_name }}
    nav
      ol.cd-multi-steps.text-bottom.count
        li(:class="{ 'visited': link_here >= 0 }")
          em Check
        li(:class="{ 'visited': link_here >= i * side.roles.length + 1 }", v-for="(side, i) in schema.side_names")
          em {{ side.long_name }}
        li(:class="{ 'visited': link_here >= links.length - 2 }")
          em Winner
        li(:class="{ 'visited': link_here >= links.length - 1 }")
          em Send
    router-view(:data="data", :schema="schema", @save="save", :error="error", :loading="loading", :links="links", @next="next", @back="back", @send="send")/
</template>

<script>
export default {
  name: 't-ballots-adjudicator',
  data () {
    return {
      loading: true,
      error: null,
      link_here: 0,
      links: [
        'check_venue',
        'Government/Prime Minister',
        'Government/Member of Government',
        'Government/Prime Minister Reply',
        'Opposition/Leader of Opposition',
        'Opposition/Member of Opposition',
        'Opposition/Leader of Opposition Reply',
        'check_win',
        'check_ballot'
      ],
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
                short_name: 'PMR',
                long_name: 'Prime Minister Reply'
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
                short_name: 'LOR',
                long_name: 'Leader of Opposition Reply'
              }
            ]
          }
        ],
        score_range: {
          matter: {
            min: 1,
            max: 10,
            step: 1
          },
          manner: {
            min: 1,
            max: 10,
            step: 1
          }
        },
        user_defined_data: {
          'poi_score': {
            title: 'POI Score',
            type: Number,
            range: {
              min: 0,
              max: 10,
              step: 1
            },
            validator: (v) => (v >= 0) ? 1 : 'should be a positive number'
          },
          'is_best_speaker': {
            title: 'Best Speaker',
            type: Boolean
          }
        }
      },
      data: {
        square: {
          id: 0,
          venue: 'H-302',
          teams: ['Team A', 'Team B'],
          chairs: [this.$route.params.adjudicator_name],
          panels: [],
          trainees: [],
          warnings: []
        },
        teams: [
          {
            name: 'Team A',
            score: 0,
            side: 0,
            win: 0,
            speakers: [
              {
                name: 'Speaker 1',
                role: 0,
                scores: {
                  matter: 1,
                  manner: 1,
                },
                user_defined_data: {
                  poi_score: 0,
                  is_best_speaker: false
                }
              },
              {
                name: 'Speaker 2',
                role: 1,
                scores: {
                  matter: 1,
                  manner: 1,
                },
                user_defined_data: {
                  poi_score: 0,
                  is_best_speaker: false
                }
              },
              {
                name: 'Speaker 3',
                role: 2,
                scores: {
                  matter: 1,
                  manner: 1,
                },
                user_defined_data: {
                  poi_score: 0,
                  is_best_speaker: false
                }
              }
            ]
          },
          {
            name: 'Team B',
            score: 0,
            side: 1,
            win: 0,
            speakers: [
              {
                name: 'Speaker 4',
                role: 0,
                scores: {
                  matter: 1,
                  manner: 1,
                },
                user_defined_data: {
                  poi_score: 0,
                  is_best_speaker: false
                }
              },
              {
                name: 'Speaker 5',
                role: 1,
                scores: {
                  matter: 1,
                  manner: 1,
                },
                user_defined_data: {
                  poi_score: 0,
                  is_best_speaker: false
                }
              },
              {
                name: 'Speaker 6',
                role: 2,
                scores: {
                  matter: 1,
                  manner: 1,
                },
                user_defined_data: {
                  poi_score: 0,
                  is_best_speaker: false
                }
              }
            ]
          }
        ]
      }
    }
  },
  computed: {
    base_url () {
      return (this.schema.side_names.every(v => this.$route.path.lastIndexOf(v.long_name) === -1)) ?
              this.$route.path.slice(0, this.$route.path.lastIndexOf('/')) :
              this.$route.path.split('/').slice(0, -2).join('/');
    }
  },
  created () {
    this.refresh_data();
  },
  watch: {
    '$route': 'refresh_data'
  },
  methods: {
    refresh_data () {
      this.loading = true;
      this.link_here = this.links.map((v, i) => this.$route.path.lastIndexOf(v) !== -1 ? i : null).filter(v => v !== null).slice(-1);
      setTimeout(()=>{
        this.loading = false;
      }, 500);
    },
    next (here) {
      this.$router.push(this.base_url + '/' + this.links[++this.link_here]);
    },
    back (here) {
      if (this.link_here < 0) {
        this.$router.back();
      } else {
        this.$router.push(this.base_url + '/' + this.links[--this.link_here]);
      }
    },
    save (data) {
      this.data = data
    },
    send () {
      if(prompt('Are you sure to Send?')){
        console.log('send:', data);
      }
    }
  }
}
</script>
