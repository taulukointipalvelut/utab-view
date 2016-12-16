<style lang="stylus" scoped>
  #component-ballot-table
    margin-left 15px
    margin-right 15px
  table
    width 100%
  tbody tr
    cursor pointer
    &:hover
      background-color whitesmoke
    &.done
      background-color ghostwhite /* or, beige */
      &:hover
        background-color whitesmoke
  th,
  td
    width auto
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    &:nth-child(1)
    &:nth-child(4)
      width 15px
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
</style>

<template lang="pug">
  #component-ballot-table
    table.pure-table.pure-table-horizontal
      thead
        tr
          th
          th Adjudicator
          th TimeDiff
          th.ctrl-btn(v-on:click="refresh_data")
            a: i.fa.fa-refresh(aria-hidden="true" title="Refresh")
      tbody
        tr(v-show="loading")
          td: i.fa.fa-spinner.fa-spin
          td(colspan="3") Loading, please wait...
        tr(v-show="error")
          td: i.fa.fa-exclamation-triangle
          td(colspan="3") {{ error }}
        router-link(tag="tr", v-if="!(loading)", v-for="datum in sorted_data", :to="datum.url" v-bind:class="{ done: (datum.time !== undefined && datum.time !== null) }")
          td: i.fa.fa-check(v-if="datum.time !== undefined && datum.time !== null" aria-hidden="true")
          td {{ datum.name }}
          td
            span(v-if="datum.time") {{ datum.time }}
            i.fa.fa-flag-checkered(v-if="datum.time === 0" aria-hidden="true")
          td: i.fa.fa-chevron-right(aria-hidden="true")
</template>

<script>
export default {
  name: 'component-ballot-table',
  props: {
    data: {
      type: Array,
      validator: (item) => {
        return item.every((v) => {
          return ((v === undefined || v === null) ||
                    ((v.id    !== undefined && v.id    !== null) &&
                     (v.name  !== undefined && v.name  !== null) &&
                     (v.url   !== undefined && v.url   !== null)
                    ));
        });
      },
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

  computed: {
    sorted_data () {
      let time_comp = (a, b) => {
        return a === null ? -1:
               b === null ? 1:
               a > b ? 1 : -1;
      }
      return this.data.slice().sort((a, b) => a.time !== b.time ? time_comp(a.time, b.time) : a.name > b.name);
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
