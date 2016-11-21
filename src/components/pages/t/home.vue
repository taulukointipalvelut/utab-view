<style lang="stylus">
  #t-home
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
  #t-home
    h1 Admin Home
    table.pure-table.pure-table-horizontal
      thead
        tr
          th ID
          th Tournament Name
          th.ctrl-btn(v-on:click="refresh_data")
            a
              i.fa.fa-refresh(aria-hidden="true" title="Refresh")
          th.ctrl-btn(v-on:click="add_data")
            a
              i.fa.fa-plus(aria-hidden="true" title="Add New Tournament")
      tbody
        tr(v-show="loading")
          td
           i.fa.fa-spinner.fa-spin
          td(colspan="3") Loading, please wait...
        tr(v-show="error")
          td
           i.fa.fa-exclamation-triangle
          td(colspan="3") {{ error }}
        tr(v-if="!(loading)", v-for="datum in tournaments")
          router-link(tag="td", :to="datum.url")
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
  name: 't-home',
  data () {
    return {
      loading: true,
      error: null,
      id_counter: 1,// just for testing
      tournaments: [
        {
          id: 0,
          name: 'Test Tournament',
          url: '/admin/t/Test Tournament',
          config_url: '/admin/t/Test Tournament/config'
        },
        {
          id: 1,
          name: 'Test Tournament 2',
          url: '/admin/t/Test Tournament 2',
          config_url: '/admin/t/Test Tournament 2/config'
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
      setTimeout(()=>{
        this.loading = false;
      }, 500);
    },
    add_data (evt) {
      let new_tournament_name = prompt('What\'s the name of new tournament?');
      if (new_tournament_name) {
        this.tournaments.push({
          id: this.id_counter++,
          name: new_tournament_name,
          url: '/' + ['admin', 't', new_tournament_name].join('/'),
          config_url: '/' + ['admin', 't', new_tournament_name, 'config'].join('/')
        });
      }
    },
    delete_data (tournament) {
      if (confirm('Are you sure to DELETE ' + tournament.name + '?')) {
        this.tournaments = this.tournaments.filter((el) => el.id !== tournament.id, this);
      }
    }
  }
}
</script>
