<style lang="stylus">
  #t-tournaments-home
    padding-left 15px
    padding-right 15px
  table
    width 100%
  tbody tr
    cursor pointer
    &:hover
      background-color whitesmoke
  th,
  td
    width 15px
    &:nth-child(2)
      width auto
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
  th a,
  td a
    text-decoration none
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
    &:first
    &:nth-child(2)
      display block
  .ctrl-btn
    cursor pointer
    text-align right
</style>

<template lang="pug">
  #t-tournaments-home
    h1 {{ tournament.name }}
    h2 Rounds
    table.pure-table.pure-table-horizontal
      thead
        tr
          th ID
          th Round Name
          th
          th.ctrl-btn(v-on:click="refresh_data")
            a
              i.fa.fa-refresh(aria-hidden="true" title="Refresh")
      tbody
        tr(v-show="loading")
          td
           i.fa.fa-spinner.fa-spin
          td(colspan="4") Loading, please wait...
        tr(v-show="error")
          td
           i.fa.fa-exclamation-triangle
          td(colspan="4") {{ error }}
        tr(v-if="!(loading)", v-for="datum in rounds")
          router-link(tag="td", :to="datum.url")
            a {{ datum.id }}
          router-link(tag="td", :to="datum.url" colspan="3")
            a {{ datum.name }}
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
          url: '/' + ['t', this.$route.params.tournament_name, 'Round 1'].join('/'),
          config_url: '/' + ['t', this.$route.params.tournament_name, 'Round 1', 'config'].join('/')
        }
      ],
      styles: [
        {
          name: "ACADEMIC",
          team_num: 2,
          score_weights: [1, 1, 1, 1]
        },
        {
          name: "NA",
          team_num: 2,
          score_weights: [1, 1, 0.5]
        },
        {
          name: "NAFA",
          team_num: 2,
          score_weights: [1, 1, 1, 1]
        },
        {
          name: "PDA",
          team_num: 2,
          score_weights: [1, 1, 1]
        },
        {
          name: "ASIAN",
          team_num: 2,
          score_weights: [1, 1, 1, 0.5]
        },
        {
          name: "BP",
          team_num: 4,
          score_weights: [1, 1]
        },
        {
          name: "PF",
          team_num: 2,
          score_weights: [1, 1, 1, 1]
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
    }
  }
}
</script>
