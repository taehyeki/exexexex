<template>
  <div class="title-site-name">
    <span class="text-h5">{{ getSeletedUser.siteName }}</span>
    <span style="font-size : 12px">최종 수정시간 : {{ getSeletedUser.updatedAt }} 🕐</span>
  </div>
</template>
<script>
import {mapGetters} from "vuex"
export default {
  computed : {
    ...mapGetters('selectedUser',['getSeletedUser'])
  },
}
</script>
<style  >
.title-site-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
