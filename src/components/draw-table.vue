<style lang="stylus" scoped>
  #component-draw-table
    margin-left 15px
    margin-right 15px
  table
    width 100%
  tbody tr
    cursor pointer
    &:hover
      background-color whitesmoke
  th,
  td
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
  th a,
  td a
    text-decoration none
    display block
  th a,
  th i
    color black
    &:hover
      color dimgray
  td a,
  td i
    color dimgray
    &:hover
      color black
  td a
    color dimgray
    &:first,
    &:nth-child(2)
      display block
  .ctrl-btn
    cursor pointer
    text-align right
  input[type=text].input-like-text
    border 0 none rgba(0, 0, 0, 0)
    outline transparent none 0
    box-shadow none
    background-color transparent
    width 100%
    margin 0
    padding 0
  tbody > tr:last-of-type
    cursor default
    font-weight bold
    color #696969
    &:hover
      background-color transparent
</style>

<template lang="pug">
  #component-draw-table
    table.pure-table.pure-table-horizontal(v-if="squares")
      thead
        tr
          th(v-if="are_venues_allocated") Venue
          th(v-for="position in tournament.style.positions_short") {{ position }}
          th(v-if="are_adjudicators_allocated") Chair
          th(v-if="are_panels_allocated") Panels
          th(v-if="are_trainees_allocated") Trainees
          th.ctrl-btn(v-on:click="refresh_data")
            a: i.fa.fa-refresh(aria-hidden="true" title="Refresh")
      tbody
        tr(v-show="loading")
          td: i.fa.fa-spinner.fa-spin
          td(colspan="4") Loading, please wait...
        tr(v-show="error")
          td: i.fa.fa-exclamation-triangle
          td(colspan="4") {{ error }}
        tr(v-if="!(loading)", v-for="square in squares")
          td(v-if="are_venues_allocated") {{ square.venue }}
          td(v-for="team in square.teams") {{ team }}
          td(v-if="are_adjudicators_allocated" v-for="chair in square.chairs") {{ chair }}
          td(v-if="are_panels_allocated" v-for="panel in square.panels") {{ panel }}
          td(v-if="are_trainees_allocated" v-for="trainee in square.trainees") {{ trainee }}
          td: span(v-for="warning in square.warnings", :title="warning.text") {{ warning.msg }}

</template>

<script>
export default {
  name: 'component-draw-table',
  props: {
    squares: {
      type: Array,
      default: []
    },
    error: {
      type: String,
      default: null
    },
    loading: {
      type: Boolean,
      default: false,
      required: true
    }
  },

  data () {
    return {
      tournament: {
        style: {
          positions_short: ['Gov', 'Opp']
        }
      }
    }
  },

  computed: {
    are_venues_allocated () {
      return this.squares.every((square) => square.venue !== undefined && square.venue != null);
    },

    are_adjudicators_allocated () {
      return this.are_chairs_allocated || this.are_panels_allocated || this.are_trainees_allocated;
    },
    are_chairs_allocated () {
      return this.squares.every((square) => square.chairs !== undefined && square.chairs !== null && square.chairs === []);
    },
    are_panels_allocated () {
      return this.squares.every((square) => square.panels !== undefined && square.panels !== null && square.panels === []);
    },
    are_trainees_allocated () {
      return this.squares.every((square) => square.trainees !== undefined && square.trainees !== null && square.trainees === []);
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
      this.$emit('refresh');
    }
  }
}
</script>
