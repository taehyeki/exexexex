<template>
  <div>
    <div
      v-for="room in getChatRooms"
      :key="room.ROOM_ID"
      style="width:100px; height: 200px;"
      @click="toRoom(room.ROOM_ID)"
    >
      <p> {{ room.ROOM_ID }} 번방</p>
      <span>{{ room.MESSAGE }}</span>
      <span v-if="room.UNREAD != 0">{{ room.UNREAD }}</span>
    </div>
  </div>
</template>
<script>
import {mapActions,mapGetters} from "vuex"
export default {
    computed : {
    ...mapGetters('auth',['getChatRooms','getSocket'])
  },
   watch : {
    // 소켓이 변경될 때 즉, 서버와의 연결이 끊기면 소켓이 재 연결 하려고 한다
    // 이 때 서버와 다시 연결이 되면 socket이 변경되는데 이를 감지하기 위해서 getSocket이라는 것을 사용하였다.
    // getSocket은 숫자이며 소켓이 서버와 연결되면 +1이 되는 구조이다. 단순히 소켓을 watch하면 변화를 인식 하지 못하기 때문에
    // 이런 구조로 만들었다.
    getSocket(){

      this.getChatRooms.map(v => {
      this.$enterRoom(`${v.ROOM_ID}-1`)
      this.$reloadChatRooms(()=>{
        this.chatRooms()
      })
    })
    },
  },
  async created(){
    // 채팅방 요청 await을 안하면 getChatRooms가 빈값이 들어옴
    await this.chatRooms()

    this.getChatRooms.map(v => {
      this.$enterRoom(`${v.ROOM_ID}-1`)
      this.$reloadChatRooms(()=>{
        this.chatRooms()
      })
    })
  },
  destroyed(){
      // 지금 현재는 단순히 화면이 바뀔 때 방을 나가도록 하였지만
      // 방을 삭제하는 기능을 넣을 경우 그 때 가서 이 부분을 한번 더 생각해보아야 할듯
      this.getChatRooms.map(v => {
        this.$leaveRoom(`${v.ROOM_ID}-1`)
      })
  },
  methods : {
    ...mapActions('auth',['chatRooms']),
    toRoom(room){
      this.$router.push(`./${room}`)

    }
  },

}
</script>
<style lang="">

</style>
