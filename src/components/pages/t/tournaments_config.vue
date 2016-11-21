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
    &:first
    &:nth-child(2)
      display block
  .ctrl-btn
    cursor pointer
    text-align right
</style>

<template lang="pug">
  #t-tournaments-config
    h1 {{ $route.tournament_name }}
    form.pure-form.pure-form-aligned
      fieldset
        label(for="field_tournament_name") Tournament Name
        input#field_tournament_name(type="text" v-model="field.tournament_name" placeholder="Tournament Name" required)

        label(for="field_tournament_style") Tournament Style
        select#field_touenament_style(v-model="field.tournament_style")
          option(v-if="this.loading") Loading
          option(v-for="style in styles" v-bind:value="style.id") {{ style.name }}
    h2 Rounds
    table.pure-table.pure-table-horizontal
      thead
        tr
          th ID
          th Round Name
          th.ctrl-btn(v-on:click="refresh_data")
            a
              i.fa.fa-refresh(aria-hidden="true" title="Refresh")
          th.ctrl-btn(v-on:click="add_data")
            a
              i.fa.fa-plus(aria-hidden="true" title="Add New Round...")
      tbody
        tr(v-show="loading")
          td
           i.fa.fa-spinner.fa-spin
          td(colspan="3") Loading, please wait...
        tr(v-show="error")
          td
           i.fa.fa-exclamation-triangle
          td(colspan="3") {{ error }}
        tr(v-if="!(loading)", v-for="datum in rounds")
          router-link(tag="td", to="datum.url")
            a {{ datum.id }}
          router-link(tag="td", :to="datum.url")
            a {{ datum.name }}
          router-link.ctrl-btn(tag="td", :to="datum.config_url")
            a
              i.fa.fa-pencil(aria-hidden="true" title="Edit")
          td.ctrl-btn(v-on:click="delete_data(datum)")
            i.fa.fa-times(aria-hidden="true" titile="Delete")
</template>

<script>
export default {
  name: 't-tournaments-config',
  data () {
    return {
      loading: true,
      error: null,
      id_counter: 1,// just for testing
      field: {
        tournament_name: '',
        tournament_style: ''
      },
      rounds: [
        {
          id: 0,
          name: 'Round 1'
        },
        {
          id: 1,
          name: 'Round 2'
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
    this.id_counter = this.tournaments.length;  // just for testing
  },
  watch: {
    '$route': 'refresh_data'
  },
  methods: {
    refresh_data () {
      this.loading = true;
      this.field.tournament_name = 'Loading...';
      this.field.tournament_style = null;
      setTimeout(()=>{
        this.loading = false;
        this.field = {
          tournament_name: 'PDA Tournament',
          tournament_style: 'PDA'
        }
      }, 500);
    },
    add_data (evt) {
      let new_round_name = prompt('What\'s the name of new round?');
      if (new_round_name) {
        this.round.push({
          id: this.id_counter++,
          name: new_round_name,
          url: '/' + ['admin', 't', this.$route.tournament_name, new_round_name].join('/'),
          config_url: '/' + ['admin', 't', this.$route.tournament_name, new_round_name, 'config'].join('/')
        });
      }
    },
    delete_data (round) {
      if (confirm('Are you sure to DELETE ' + round.name + '?')) {
        this.rounds = this.rounds.filter((el) => el.id !== round.id, this);
      }
    }
  }
}
</script>
