<template>
  <v-simple-table
    fixed-header
    height="350"
  >
    <template #default>
      <thead>
        <tr>
          <th class="text-left">
            사업자 명
          </th>
          <th class="text-left">
            거리
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="site in getSeletedUser.siteList"
          :key="site"
        >
          <td>{{ site.SITE_NAME }}</td>
          <td>{{ changeToString(site.DIST) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  computed : {
    ...mapGetters('selectedUser',['getSeletedUser'])
  },
  methods : {
    changeToString(value){
      return String(value).slice(0,4) + 'km'
    }
  }
}
</script>
<style lang="">

</style>
