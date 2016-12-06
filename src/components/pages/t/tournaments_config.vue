<style lang="stylus">
  #t-tournaments-config
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
  #t-tournaments-config
    form.pure-form.pure-form-aligned
      h1
        input#field_tournament_name.input-like-text(type="text" v-model="tournament.name" placeholder="Tournament Name..." required)
      fieldset
        .pure-control-group
          label(for="field_tournament_style") Tournament Style
          select#field_touenament_style(v-model="tournament.style")
            option(v-if="this.loading") Loading
            option(v-for="style in styles" v-bind:value="style.id") {{ style.name }}
    h2 Rounds
    table.pure-table.pure-table-horizontal
      thead
        tr
          th ID
          th Round Name
          th
          th.ctrl-btn(v-on:click="refresh_data")
            a: i.fa.fa-refresh(aria-hidden="true" title="Refresh")
      tbody
        tr(v-show="loading")
          td: i.fa.fa-spinner.fa-spin
          td(colspan="4") Loading, please wait...
        tr(v-show="error")
          td: i.fa.fa-exclamation-triangle
          td(colspan="4") {{ error }}
        tr(v-if="!(loading)", v-for="datum in rounds")
          router-link(tag="td", :to="datum.url")
            a {{ datum.id }}
          router-link(tag="td", :to="datum.url")
            a {{ datum.name }}
          router-link.ctrl-btn(tag="td", :to="datum.config_url")
            a: i.fa.fa-pencil(aria-hidden="true" title="Edit")
          td.ctrl-btn(v-on:click="delete_data(datum)")
            i.fa.fa-times(aria-hidden="true" titile="Delete")
        tr(v-if="!(loading)")
          td {{ id_counter }}
          td(colspan="2"): input#new_round_name.input-like-text(type="text" v-model="new_round_name" placeholder="New Round Name...")
          td.ctrl-btn(v-on:click="add_data")
            a: i.fa.fa-plus(aria-hidden="true" title="Add New Round...")
</template>

<script>
export default {
  name: 't-tournaments-config',
  data () {
    return {
      loading: true,
      error: null,
      id_counter: 1,// just for testing
      new_round_name: '',
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
    this.refresh_data();
  },
  watch: {
    '$route': 'refresh_data'
  },
  methods: {
    refresh_data () {
      this.loading = true;
      setTimeout(()=>{
        this.loading = false;
        this.id_counter = this.rounds.length; // just for testing
      }, 500);
    },
    add_data (evt) {
      if (this.new_round_name) {
        this.rounds.push({
          id: this.id_counter++,
          name: this.new_round_name,
          url: '/' + ['t', this.$route.params.tournament_name, this.new_round_name].join('/'),
          config_url: '/' + ['t', this.$route.params.tournament_name, this.new_round_name, 'config'].join('/')
        });
        this.new_round_name = '';
        this.refresh_data();
      }
    },
    delete_data (round) {
      if (confirm('Are you sure to DELETE ' + round.name + '?')) {
        this.rounds = this.rounds.filter((el) => el.id !== round.id, this);
        this.refresh_data();
      }
    }
  }
}
</script>
