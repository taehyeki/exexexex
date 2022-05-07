<template>
  <v-simple-table

    fixed-header
    height="700px"
  >
    <template #default>
      <thead>
        <tr>
          <th class="text-left">
            사이트 아이디
          </th>
          <th class="text-left">
            사이트 이름
          </th>
          <th class="text-left">
            사업자 등록번호
          </th>
          <th class="text-left">
            허가증 번호
          </th>
          <th class="text-left">
            등록일자
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item,idx in showPermitList"
          :key="idx"
          style="cursor : pointer"
          @click="goToContent(item.SITE_ID)"
        >
          <td>{{ item.SITE_ID }}</td>
          <td>{{ item.SITE_NAME }}</td>
          <td>{{ item.PERMIT_REG_CODE }}</td>
          <td>{{ item.COMPANY_INFO[0].BIZ_REG_CODE }}</td>
          <td>{{ getTime(item.CREATED_AT) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  computed : {
    ...mapGetters('permit2',['showPermitList'])
  },
  methods : {
    getTime(time){
      return time.slice(0,19)
    },
    goToContent(siteId){
       this.$router.push({ path: `content/${siteId}`})
    }
  }



}
</script>
<style lang="">

</style>
