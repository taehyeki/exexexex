<template>
  <div>
    <v-row>
      <v-col cols="6">
        <v-btn
          style="width: 100%"
          @click="changeFlagFalse"
        >
          허가증
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          style="width: 100%"
          @click="changeFlagTrue"
        >
          사업자등록증
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <a
        :href="getSelectedPermit.permitRegImgPath"
        target="_blank"
      >
        <img
          v-if="flag===false"
          :src="getSelectedPermit.permitRegImgPath"
          alt="permit"
          style="object-fit: contain;width : 401px; height : 570px; border : 1px solid; margin-top : 20px; cursor : poitner"
        >
      </a>
      <a
        :href="getSelectedPermit.bizRegImgPath"
        target="_blank"
      >
        <img
          v-if="flag===true"
          :src="getSelectedPermit.bizRegImgPath"
          alt="biz"
          style="object-fit: contain;width : 401px; height : 570px; border : 1px solid; margin-top : 20px; cursor : poitner"
        >
      </a>
    </v-row>
    <v-row>
      <v-col v-if="flag===false">
        <v-file-input
          id="permit-img"
          accept="image/jpeg,image/jpg,image/png"
          label="허가증 사진 수정"
          @change="uploadPermitImg"
        />
      </v-col>
      <v-col v-if="flag===true">
        <v-file-input
          id="biz-img"
          accept="image/jpeg,image/jpg,image/png"
          label="사업자등록증 사진 수정"
          @change="uploadBizImg"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import {mapActions,mapGetters,mapMutations} from "vuex"
export default {
  data(){
    return {
      flag : false,
      imgUrl : ''
    }
  },
    computed : {
    ...mapGetters('permit',['getSelectedPermit'])
  },
  updated(){
    console.log('업데이트')

  },

  methods : {
    ...mapActions('permit',['uploadPermitImgToS3','uploadBizImgToS3']),
    ...mapMutations('permit',['setRefresh']),
    changeFlagTrue(){
      this.flag = true
    },
    changeFlagFalse(){
      this.flag = false
    },
    uploadPermitImg(e){
      if (e == undefined){
        alert('파일을 제대로 입력해주세요')
        return
      }
      const formData = new FormData();
      formData.append('file', e)
      this.uploadPermitImgToS3(formData)
    },
    uploadBizImg(e){
      // const imgBox = document.getElementById('biz-img')
      if (e == undefined){
        alert('파일을 제대로 입력해주세요')
        return
      }
      const formData = new FormData();
      formData.append('file', e)
      this.uploadBizImgToS3(formData)

    },

  }
}
</script>
<style lang="">

</style>
