<template>
  <v-card-title style=" padding : 0px; ">
    <!-- 포지션 이름 -->
    <v-row style="margin-top : 72px">
      <v-col
        style="padding : 0px; "
        class="font-size-14-bold text-center"
      >
        {{ position }}
        <strong
          class="font-size-20-bold"
          style="margin-right : -4px; margin-left : "
        >{{ name }}</strong>
        님
      </v-col>
    </v-row>
    <v-row style="margin : 0px">
      <v-col
        style="padding : 0px; margin-top : 10px; color : #5A53F1; font-size : 16px; font-weight : bold"
        class="font-size-14-bold text-center"
      >
        {{ getDate }}
      </v-col>
    </v-row>
  </v-card-title>
</template>
<script>
export default {
  props : {

    position : {
      default : '매니저',
      type : String
    },
    name : {
      default : '홍길동',
      type : String
    }
  },
  computed : {
    getDate(){
      const year = new Date().getFullYear()
      const month = new Date().getMonth()
      const day = new Date().getDate()
      return `${year}년·${month + 1}월·${day}일`
    },
  }
}
</script>
<style scoped>
  .font-size-14-bold {
    font-weight: 700;
    font-size: 14px;
  }
  .font-size-20-bold {
    font-weight: 700;
    font-size: 20px;
  }

</style>
