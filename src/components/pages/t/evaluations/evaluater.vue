<style lang="stylus" scoped>
  #t-evaluations-adjudicator
    padding-left 15px
    padding-right 15px
  li.visited:last-of-type em
    color #96c03d
</style>

<template lang="pug">
  #t-evaluations-adjudicator
    h1 Evaluation for {{ $route.params.round_name }}&nbsp;
      small by {{ $route.params.evaluater_name }}
    nav
      ol.cd-breadcrumb.triangle
        li(:class="{ 'visited':visit_list['check_venue'] }")
          em Check
        li(:class="{ 'visited': visit_list[evaluatee.toLowerCase()] }", v-for="evaluatee in evaluatees")
          em {{ evaluatee }}
        li(:class="{ 'visited': visit_list['check_evaluation'] }")
          em Send
    router-view(:data="data", :schema="schema", @save="save", :error="error", :loading="loading", @visited_navs="visited_navs", :links="links")/
</template>

<script>
export default {
  name: 't-evaluations-adjudicator',
  data () {
    return {
      loading: true,
      error: null,
      schema: {
        score_range: {
          min: 1,
          max: 10,
          step: 1
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
        square: {
          id: 0,
          venue: 'H-302',
          teams: ['Team A', 'Team B'],
          chairs: [this.$route.params.evaluater_name],
          panels: [],
          trainees: ['Adjudicator 5'],
          warnings: []
        },
        chairs: [
          {
            name: 'Adjudicator 1',
            score: 0
          }
        ],
        panels: [],
        trainees: [
          {
            name: 'Adjudicator 5',
            score: 0
          }
        ]
      }
    }
  },
  computed: {
    evaluatees () {
      return [].concat(this.data.chairs, this.data.panels, this.data.trainees)
             .map(v => v.name)
             .filter(v => v !== this.$route.params.evaluater_name);
    },
    links () {
      return [].concat('check_venue', this.evaluatees, 'check_evaluation');
    },
    visit_list () {
      var o = {};
      this.links.forEach(v => o[v] = false);
      return o;
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
        time: Date.now(),
        url: '/' + ['t', this.$route.params.tournament_name, this.$route.params.round_name, 'evaluations', 'Adjudicator 1', '20161216000000'].join('/')
      });
    },
    delete_data (datum) {
      this.data = this.data.filter((el) => el.id !== datum.id, this);
    },
    nav_is_here (test) {
      let now_here = this.$route.params.side_name ? $route.params.side_name :
                     this.$route.path.lastIndexOf('/check_venue') !== -1 ? 'check_venue' :
                     this.$route.path.lastIndexOf('/check_ballot') !== -1 ? 'check_ballot' :
                     '*';
      return now_here === test;
    },
    visited_navs (visiting) {
      this.visit_list[visiting] = true;
      console.log('visiting:', visiting);
    },
    save (data) {
      this.data = data
    },
    send () {
      if(prompt('Are you sure to Send?')){
        console.log('send:', data);
      }
    },
    p (y, x) {
      console.log(y, x);
      return x;
    }
  }
}
</script>
