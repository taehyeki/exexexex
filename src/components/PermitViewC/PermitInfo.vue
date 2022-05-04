<template>
  <div class="permit-info">
    <v-row>
      <v-col>
        <v-btn
          style="width: 100%; margin-top : 20px; margin-bottom : 20px"
          @click="clickModifyBtn"
        >
          수정하기
        </v-btn>
      </v-col>
    </v-row>
    <PermitImages />
    <v-row>
      <v-col>
        최종 수정 시간 : {{ selectedPermit['updatedAt'] }}
      </v-col>
    </v-row>
    <AddressChange />
    <v-row
      v-for="value,key , idx in selectedPermit"
      :key="idx"
      style="margin-top : 10px"
    >
      <v-col
        v-if="!(key in {
          'permitRegImgPath':'',
          'bizRegImgPath':'',
          'siteId':'',
          'bCode':'',
          'updatedAt':'',
          'wsteList': '',
          'siteInfo':'',
          'lat':'',
          'lng':'',
          'siteList':'',
        })"
        cols=""
      >
        <PermitSubheader :title="key" />
      </v-col>

      <v-col
        v-if="!(key in {
          'permitRegImgPath':'',
          'bizRegImgPath':'',
          'siteId':'',
          'bCode':'',
          'updatedAt':'',
          'wsteList':'',
          'siteInfo':'',
          'lat':'',
          'lng':'',
          'siteList':'',
        })"
        cols="8"
      >
        <v-text-field
          v-if="key == 'addr' "
          id="address-kakao2"
          :value="getSelectedPermit[key]"
          hide-details=""
          solo
          @input="MyVmodel(key,$event)"
        />

        <v-text-field
          v-else
          :value="getSelectedPermit[key]"
          hide-details=""
          solo
          @input="MyVmodel(key,$event)"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col
        style="cursor : pointer;"
        @click="dialog=true"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
        사업장 폐기물 종류 추가하기
      </v-col>
    </v-row>
    <v-row
      v-for="wste,idx in getSelectedPermit['wsteList']"
      :key="(idx+1)*100"
    >
      <v-col>
        <v-subheader>
          사업자 폐기물 종류
        </v-subheader>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text
            hide-details=""
            readonly
          >
            {{ wste.WSTE_NM }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-text
            hide-details=""
            readonly
          >
            {{ wste.APPR_NM }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="auto"
        style="cursor : pointer"
        @click="removeWste(wste)"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-col>
    </v-row>
    <PermitKinds
      :dialog="dialog"
      @close-dialog="closeDialog"
    />
    <SiteMap />
  </div>
</template>



<script>

import {mapState,mapActions,mapMutations,mapGetters} from "vuex"
import PermitSubheader from "@/components/PermitViewC/PermitSubheader.vue"
import PermitImages from "@/components/PermitViewC/PermitImages.vue"
import PermitKinds from "@/components/PermitViewC/PermitKinds.vue"
import AddressChange from "@/components/PermitViewC/AddressChange.vue"
import SiteMap from "@/components/PermitViewC/SiteMap.vue"
export default {
  components : {
    PermitSubheader,PermitImages,PermitKinds,AddressChange,SiteMap
  },
  data () {
      return {
        dialog: false,
      }
    },
  computed : {
    ...mapState('permit',['selectedPermit']),
    ...mapGetters('permit',['getSelectedPermit'])
  },

  methods : {
    ...mapActions('permit',['sendModifiedPermit']),
    ...mapMutations('permit',['changeSelectedInfo','addWsteList','removeWsteList']),
    clickModifyBtn(){
      this.sendModifiedPermit()
    },
    // mapState로 vuex store에 있는 값을 그대로 v-model을 사용해도 되지만 왠지모르게
    // vue devtool에서 실시간으로 변경이 되지 않는 문제가 발생했다.
    // 문제점 : 실제로 state의 값이 바뀌고 이를 db에 보내서 값을 변경시키지만
    // selectedPermit에는 값이 제대로 반영이 되지 않으므로 바뀐 것 같아보이지 않기에
    // 아래의 method를 만들어주어서 selectedPermit에는을 강제로 변경시킴
    MyVmodel(key,event){

      this.changeSelectedInfo({key,event})
    },
    closeDialog(){
      this.dialog = false
    },
    removeWste(value){
      this.removeWsteList(value)
    }
  },


}
</script>
<style lang="">

</style>
