<template>
  <v-simple-table
    dense
    fixed-header
    height="300px"
  >
    <template #default>
      <thead>
        <tr>
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
        >
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
    }
  }



}
</script>
<style lang="">

</style>
