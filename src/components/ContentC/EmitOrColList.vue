<template>
  <v-simple-table

    fixed-header
    height="700px"
  >
    <template #default>
      <thead>
        <tr>
          <th class="text-left">
            오더 코드
          </th>
          <th class="text-left">
            사이트 이름
          </th>
          <th class="text-left">
            개인 / 사업자
          </th>
          <th class="text-left">
            확인 유무
          </th>
          <th class="text-left">
            주소
          </th>
          <th class="text-left">
            방문 마감일
          </th>
          <th class="text-left">
            입찰 마감일
          </th>
          <th class="text-left">
            생성 일자
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item,idx in getShowListIfIEmitter"
          :key="idx"
          style="cursor : pointer"
        >
          <td>{{ item.orderCode }}</td>
          <td>{{ item.siteName }}</td>
          <td>{{ checkPerOrCol(item.siteId) }}</td>
          <td>{{ checkReadOrNot(item.checkState) }}</td>
          <td>{{ item.addr }}</td>
          <td>{{ getTime(item.visitEndAt) }}</td>
          <td>{{ getTime(item.biddingEndAt) }}</td>
          <td>{{ getTime(item.createdAt) }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  computed : {
    ...mapGetters('selectedUser',['getShowListIfIEmitter'])
  },
  methods : {
    getTime(time){
      return time.slice(0,11)
    },
    goToContent(siteId){
       this.$router.push({ path: `content/${siteId}`})
    },
    checkReadOrNot(state){
      if ( state == 0){
        return '확인'
      }
      return '미확인'
    },
    checkPerOrCol(code){
      if (Number(code) == 0){
        return '개인 배출자'
      }
      return '사업자 배출자'
    },

  }



}
</script>
<style lang="">

</style>
