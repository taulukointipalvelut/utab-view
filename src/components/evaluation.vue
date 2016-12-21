<style lang="stylus" scoped>
  /*#component-ballot*/
  .table-wrapper
    width 100%
    overflow auto
    white-space nowrap
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
  #component-ballot
    .table-wrapper
      table.pure-table.pure-table-horizontal
        thead
          tr
            th Role
            th Name
            th Score
            th Comments
            th.ctrl-btn(v-on:click="refresh_data")
              a: i.fa.fa-refresh(aria-hidden="true" title="Refresh")
        tbody
          tr(v-show="loading")
            td: i.fa.fa-spinner.fa-spin
            td(colspan="4") Loading, please wait...
          tr(v-show="error")
            td: i.fa.fa-exclamation-triangle
            td(colspan="4") {{ error }}
          tr(v-if="!(loading)", v-for="datum in data")
            td {{ datum.role }}
            td {{ datum.name }}
            td {{ datum.score }}
            td {{ datum.comments }}
            td
              router-link.ctrl-btn(v-if="datum.url", :to="datum.url")
                i.fa.fa-pencil(aria-hidden="true" title="Edit")
</template>

<script>
export default {
  name: 'component-ballot',
  props: {
    data: {
      type: Array,
      required: true
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
