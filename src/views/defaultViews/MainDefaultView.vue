<template>
  <div

    style="margin: 0px auto; height : 100%; padding : 0px; width : 1320px;"
  >
    <div style="height : 100%">
      <div style="height : 100%; margin : 0; display : flex ">
        <div
          style="padding : 0px"
          class="left-col"
        >
          <LeftNav />
        </div>
        <div
          style="padding : 0px;"
          class="right-col"
        >
          <router-view style="height : 100%; " />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LeftNav from "@/components/LeftNav.vue"
export default {

  components : {
LeftNav
  },


};
</script>
<style scoped>
.left-col {
  width: 240px;
  margin-right : 80px;
  background-color : #eeeff3;
  border-radius: 24px;
}
.right-col > div{
  width: 1000px;
}
</style>


<style lang="">

</style>
