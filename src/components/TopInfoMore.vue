<template>
  <v-simple-table
    id="infinite-list"
    fixed-header
    height="416"
    dense
  >
    <template #default>
      <thead>
        <tr>
          <th class="text-center">
            종류
          </th>
          <th class="text-center">
            시간
          </th>
          <th class="text-center">
            상세내역
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="targetInfo,idx in returnNowTargetInfo"
          :key="idx"
          class="text-center"
        >
          <td>{{ targetInfo.PUSH_TITLE }}</td>
          <td>{{ stringToTime(targetInfo.PUSH_CREATED) }}</td>
          <td>{{ targetInfo.PUSH_BODY }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
  import {mapGetters,mapActions,mapMutations} from "vuex"
  export default {

    data () {
      return {

      }
    },
    computed : {
      ...mapGetters('main',['returnNowTargetInfo']),

    },
    mounted(){
      const listElm = document.querySelector('#infinite-list')
      const listElmChild = listElm.childNodes[0];
      listElmChild.addEventListener('scroll', (e) => {
        const { scrollHeight, scrollTop, clientHeight} = e.target
        if (scrollTop != 0 && clientHeight + scrollTop >= scrollHeight){
          this.addOffsetSize()
          this.getMoreTargetInfo()
        }

      });
    },
    methods : {
      ...mapMutations('main',['addOffsetSize']),
      ...mapActions('main',['getMoreTargetInfo']),
      stringToTime(time){

        return time.slice(0,16)
      }
    }

  }
</script>
<style scoped>
tbody tr:nth-child(odd) {
   background-color: rgba(238, 239, 243, 0.5) !important;
}
</style>
