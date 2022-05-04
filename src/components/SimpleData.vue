<template>
  <v-simple-table
    id="simple-list"
    fixed-header
    :height="height"
    dense
  >
    <template #default>
      <thead>
        <tr>
          <th
            v-for="title in titleList"
            :key="title"
            class="text-center"
          >
            {{ title }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="targetInfo,idx in tableContent.subTableInfo"
          :key="idx"
          class="text-center"
        >
          <td>{{ targetInfo.SITE_NAME }}</td>
          <td>{{ targetInfo.BIZ_REG_CODE }}</td>
          <td>{{ targetInfo.CREATED_AT }}</td>
          <!-- <td>
            <v-btn
              v-if="targetInfo.BIZ_REG_CODE_REGISTERED == 0"
              style="background-color : red"
              @click="btnClick"
            >
              미확인
            </v-btn>
            <v-btn
              v-else-if="targetInfo.BIZ_REG_CODE_REGISTERED == null"
            >
              개인배출자
            </v-btn>
            <v-btn v-else>
              확인
            </v-btn>
          </td> -->
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
  import {mapActions,mapMutations,mapState} from "vuex"
  export default {

    props : {
      height : {
        type : Number,
        default : 300
      },
      btnClick : {
        type : Function,
        default : ()=> {}
      },
      tableContent : {
        type : Object,
        default : ()=> {}
      }

    },
    data(){
      return {
        titleList : ['상호명','사업자등록번호','등록시간']
      }
    },
    computed : {
      ...mapState('main',['mainTable']),
    },
    mounted(){
      const listElm = document.querySelector('#simple-list')
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
