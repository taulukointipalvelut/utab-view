<style lang="stylus" scoped>
  /*#component-version-table*/
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
  tbody > tr:last-of-type
    font-weight bold
    color silver
</style>

<template lang="pug">
  #component-version-table
    .table-wrapper
      table.pure-table.pure-table-horizontal
        thead
          tr
            th Version
            th Time Stamp
            th.ctrl-btn(v-on:click="refresh_data")
              a: i.fa.fa-refresh(aria-hidden="true" title="Refresh")
        tbody
          tr(v-show="loading")
            td: i.fa.fa-spinner.fa-spin
            td(colspan="2") Loading, please wait...
          tr(v-show="error")
            td: i.fa.fa-exclamation-triangle
            td(colspan="2") {{ error }}
          tr(v-if="!(loading)", v-for="datum in data")
            router-link(tag="td", :to="datum.url")
              a {{ datum.version }}
            router-link(tag="td", v-show="datum.time !== undefined && datum.time !== null", :to="datum.url")
              a {{ datum.time }}
            td.ctrl-btn(v-on:click="delete_data(datum)")
              i.fa.fa-times(aria-hidden="true" title="Delete")
          tr(v-if="!(loading)" v-on:click="add_data")
            td(colspan="2") Add New Version...
            td.ctrl-btn
              a: i.fa.fa-plus(aria-hidden="true" title="Add")
</template>

<script>
export default {
  name: 'component-version-table',
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      validator: (item) => {
        return item.every((v) => {
          return ((v === undefined || v === null) ||
                    ((v.version !== undefined && v.version !== null) &&
                     (v.time    !== undefined && v.time    !== null) &&
                     (v.url     !== undefined && v.url     !== null)
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

  created () {
    this.refresh_data();
  },
  watch: {
    '$route': 'refresh_data'
  },
  methods: {
    refresh_data () {
      this.$emit('refresh');
    },
    add_data (evt) {
      this.$emit('add');
    },
    delete_data (datum) {
      if (confirm('Are you sure to DELETE ' + datum.version + '?')) {
        this.$emit('delete', datum);
      }
    }
  }
}
</script>
