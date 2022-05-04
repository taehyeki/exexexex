<template>
  <v-card

    color="#eeeff3"
    elevation="0"
    class="left-nav"
    rounded="xl"
  >
    <LoginInfo
      position="총괄매니저"
      name="김태현"
    />
    <v-row
      justify="space-around"
      style="margin-top: 183px;"
    >
      <navBtn
        v-for="obj, index in getIndexList"
        :id="index"
        :key="index"
        :icon-name="obj.iconName"
        :text="obj.text"
        style="justify-content : start"
        @click.native="clickBtn"
      />
    </v-row>
    <v-row
      id="bottom-row"
      justify="space-around"
    >
      <v-btn>
        <v-icon>
          mdi-forum
        </v-icon>
      </v-btn>


      <v-btn>
        <v-icon>
          mdi-sticker-text-outline
        </v-icon>
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
import navBtn from "@/components/NavBtn.vue"
import LoginInfo from "@/components/LoginInfo.vue"
import {mapGetters, mapMutations} from "vuex"
export default {
  components : {
  navBtn,LoginInfo
  },

  computed : {
    ...mapGetters('leftnav',['getIndexList','getNowNum'])

  },
  mounted(){
    const defaultNum = String(this.getNowNum)
    const btn = document.getElementById(defaultNum)
    btn.classList.add('clicked')
  },
  methods : {
    ...mapMutations('leftnav',['setNowNum']),

    clickBtn(e){
      for(var i =0; i<7; i++){
        const btn = document.getElementById(`${i}`)
        btn.classList.remove('clicked')
      }
      let id = e.target.id
        if (e.target.id == "") {
          id = e.target.parentNode.id
          const btn = document.getElementById(`${id}`)
          btn.classList.add('clicked')
          this.setNowNum(id)
          return
        }
      const btn = document.getElementById(`${id}`)
      btn.classList.add('clicked')
      this.setNowNum(id)
    }
  }
}
</script>
<style scoped>
  .left-nav {
    padding : 0px 20px;
    height : 100%;
  }


  .left-col .clicked {
    box-shadow: 4px 4px 10px rgba(90, 83, 241, 0.6) !important;
    background-color: #5A53F1 !important;
    color : white !important;
        justify-content: center !important;
  }

  .theme--light.v-btn.v-btn--has-bg {
    background-color: transparent;
  }
   .left-col .btn-default {
    height : 48px !important;
    font-size: 16px;
    margin-top : 7px;
    color : #B0B0B0 ;
    border-radius : 10px;
    width : 200px;
    font-weight: bold;

  }
  #bottom-row {
    width : 190px;
    height: 48px;
    margin: 0px;
    margin-left : 5px;
    margin-top : 241px;

  }
  #bottom-row .v-btn {
    background-color: #5A53F1;
    width: 85px;
     height: 100%;
      color : white
  }

</style>
