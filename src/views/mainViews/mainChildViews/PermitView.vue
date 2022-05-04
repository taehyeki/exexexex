<template>
  <div style="display : flex; align-items : center ">
    <div class="p-container">
      <div style="display : flex; flex-direction : column">
        <h1>허가증 등록 확인</h1>
        <RadioBtn />
        <div class="permits-box">
          <PermitUnit
            v-for="permit, idx in getPermitList "
            :key="idx"
            :info="permit"
            @click.native="gogo(permit)"
          />
        </div>
      </div>

      <div class="permit-box">
        <PermitSearch />
        <PermitInfo v-if="selectedPermit.siteId !== ''" />
      </div>
    </div>
  </div>
</template>
<script>

import PermitUnit from '@/components/PermitUnit.vue'
import PermitInfo from '@/components/PermitViewC/PermitInfo.vue'
import RadioBtn from '@/components/PermitViewC/RadioBtn.vue'
import PermitSearch from '@/components/PermitViewC/PermitSearch.vue'

import {mapState, mapActions,mapMutations, mapGetters } from "vuex"
export default {
    components : {
      PermitUnit,PermitInfo,RadioBtn,PermitSearch,
    },
      computed : {
      ...mapGetters('permit',['getPermitList','getNow']),
      ...mapState('permit',['selectedPermit'])
    },
    created(){
      console.log('permit view의 create 시점.. 여기서 axios로 데이터를 요청한다')
      this.sefOffsetZeroAndPermitListEmpty()
      this.getPermits(this.getNow)
      this.getWsteLists()

    },
    mounted(){
      const listElm = document.querySelector('.permits-box')
      listElm.addEventListener('scroll', (e) => {
        const { scrollHeight, scrollTop, clientHeight} = e.target
        if (scrollTop != 0 && clientHeight + scrollTop >= scrollHeight){
          this.permitAddOffsetSize()
          this.getPermits(this.getNow)
        }
      });
    },
    methods : {
      ...mapActions('permit',['getPermits','getPermits','getWsteLists']),
      ...mapMutations('permit',['setSelectedPermit','permitAddOffsetSize','sefOffsetZeroAndPermitListEmpty']),
      gogo(e){
        this.setSelectedPermit(e)
      }
    }
}
</script>
<style lang="scss" >
.p-container {
  display: flex ;
  height: 928px;
  width: 100%;
  .permits-box {
    overflow: scroll;

  }
  .permit-box{
    margin : 0 auto;

  }
}
</style>
