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
            연락처
          </th>
          <th class="text-left">
            거리
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="site,idx in getCollectorListWithin"
          :key="idx"
          style="cursor : pointer"
          @click="goToContent(site.ID)"
        >
          <td>{{ site.SITE_NAME }}</td>
          <td>{{ site.PHONE }}</td>
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
    ...mapGetters('emissions',['getCollectorListWithin'])
  },
  methods : {
    changeToString(value){
      return String(value).slice(0,4) + 'KM'
    },
     goToContent(siteId){
       this.$router.push({ path: `/admin/main/emitter-collector/${siteId}`})
    },
  }
}
</script>
<style lang="">

</style>
