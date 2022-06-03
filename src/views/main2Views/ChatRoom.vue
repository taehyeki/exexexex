<template>
  <div
    id="divdiv"
    style="height : 300px ; overflow : auto"
  >
    채팅방
    <div>
      <div id="ulList">
        <div
          v-for="chat,idx in getChats"
          :key="idx"
        >
          <div
            v-if="getUserId==chat.USER_ID"
            class="mine"
          >
            {{ chat.IS_READ }}
            {{ chat.MESSAGE }}
            {{ chat.CREATED_AT }}
          </div>
          <div v-else>
            {{ chat.IS_READ }}
            {{ chat.MESSAGE }}
            {{ chat.CREATED_AT }}
          </div>
        </div>
        <div
          v-for="chat,idx in newChats"
          :key="chat+idx"
        >
          <div
            v-if="getUserId==chat.USER_ID"
            class="mine"
          >
            {{ chat.IS_READ }}
            {{ chat.MESSAGE }}
            {{ chat.CREATED_AT }}
          </div>
          <div v-else>
            {{ chat.IS_READ }}
            {{ chat.MESSAGE }}
            {{ chat.CREATED_AT }}
          </div>
        </div>
      </div>
      <div>
        <input
          v-model="text"
          type="text"
          @keyup.enter="sendText"
        >
      </div>
    </div>
  </div>
</template>
<script>

import axios from "axios"
import {mapMutations,mapGetters} from "vuex"

export default {
  data(){
    return {
      text : '',
      roomId : '',
      newChats : [],
    }
  },
  computed : {
  ...mapGetters('auth',['getUserId','getChats','getSocket']),
  },
  watch : {
    // 소켓이 변경될 때 즉, 서버와의 연결이 끊기면 소켓이 재 연결 하려고 한다
    // 이 때 서버와 다시 연결이 되면 socket이 변경되는데 이를 감지하기 위해서 getSocket이라는 것을 사용하였다.
    // getSocket은 숫자이며 소켓이 서버와 연결되면 +1이 되는 구조이다. 단순히 소켓을 watch하면 변화를 인식 하지 못하기 때문에
    // 이런 구조로 만들었다.
    getSocket(){
      // 먼저 소켓에 채팅이벤트를 주었던 것을 off로 해주자
      this.$socket.off('chat');
      this.$socket.off('disconnect');
      this.$socket.off('reload');

      // 재연결되면 방에 다시 입장해주고,
      this.$enterRoom(this.roomId)
      // 재연결 되었을 때 다시 글을 적으면 화면에 보일 수 있도록 다시 이벤트를 넣어주는 것이다.
      // 이렇게 하지 않으면 새로운 소켓에는 이벤트가 달려있지 않기때문에 화면에 글이 올라오지 않는 현상이 생긴다.
      this.$chatSet(this.fn)
      this.$disconnetFromServer(this.fn2)
      this.$reload(this.fn3)
      // 이건 방에있는 모두에게 보여질 메시지(시스템)이다.
      // 아마 아직 안보임
      this.fn2('재연결')

    },
  },

  async created(){

    // 먼저 방이 생성이되면 url을 따서 방 번호를 가져온다.
    const url = window.location.href
    const splitedUrl = url.split('/')
    const roomId = splitedUrl[splitedUrl.length - 1]
    this.roomId = roomId
    try {
      let data = {
        params: JSON.stringify([
          {
            USER_ID : this.getUserId,
            ROOM_ID : this.roomId,
            // 아직 의미 없는 스크롤, 구현 못함
            PAGE_SIZE : 1000,
            OFFSET_SIZE : 0,
          },
        ]),
      };
      // 그리고 유저아이디와 방 번호를 post로 보내서 서버에보낸다.
      // 해당 방의 기존의 채팅을 받아오는 과정이다.
      const res = await axios.post(`${process.env.VUE_APP_CHAT_API}/get_chats`,data)
      // store에 chat의 내용을 저장한다.
      this.setChats(res.data.data)
    } catch(e){
      console.log(e)
    }
    // fn2를 따로 만들어준 이유는 브라우저의 소켓이 서버와 disconnect된 경우에
    // 들어오는 메시지는 tranport close? 라는 것이 들어온다. 이건 defualt로
    // 연결이 끊어졌을 때 들어오는 메시지 같다. 따라서 이를 바꿔줄 필요가 있기에
    // 다른 함수를 만들어주었다.



      // 방에 들어가는 작업
      this.$enterRoom(this.roomId)
      // 채팅을 받으면 fn함수를 실행시키는 작업
      this.$chatSet(this.fn)
      // 브라우저가 서버와 연결이 끊길 때 fn2함수를 실행시키는 작업
      this.$disconnetFromServer(this.fn2)
      // 상대방이 채팅방에 들어왔을 때 내 실행되는 작업들
      this.$reload(this.fn3)
  },

  // 업데이트 될 때 마다 스크롤을 아래로 내림
  updated(){
    const chatBox = document.querySelector('#divdiv')

    chatBox.scrollTop = chatBox.scrollHeight;
  },
  // mounted(){
  //   const chatBox = document.querySelector('#divdiv')
  //   chatBox.scrollTop = chatBox.scrollHeight;

  // },
  destroyed(){

    // 아래와 같이 해주는 이유는 crated훅에서 만들어지는 이벤트 리스너들이
    // 중복으로 적용이 되는 현상이 발생 예를 들어 ( 통계 -> 채팅 -> 통계 -> 채팅 )
    // 으로 이동했다면 화면에서 채팅이 2번 적히는 현상

    // 채팅방에서 빠져나가면 ( 다른 화면으로 이동 ) 방을 빠져나가는 작업
    this.$leaveRoom(this.roomId)
    // 채팅 이벤트를 없애는 작업
    this.$socket.off('chat');
    // 디스코넥 이벤트를 없애는 작업
    this.$socket.off('disconnect');
    this.$socket.off('reload');

  },


  methods : {
    ...mapMutations('auth',['setChats']),
    // 채팅을 보내는 작업 백에 유저아이디, 방아이디, 메시지를 전송
    async sendText(){
       let data = {
        params: JSON.stringify([
          {
            USER_ID : this.getUserId,
            ROOM_ID : this.roomId,
            MESSAGE : this.text
          },
        ]),
      };
      this.text = ''
      //
      try {
        await axios.post(`${process.env.VUE_APP_CHAT_API}/insert_chat`,data)
      } catch(e){
        console.log(e)
      }
    },
    // 시간 처리해주는 메서드
    showCreated(time){
      return time.slice(11,16)
    },
    // 읽음 표시 처리해주는 메서드
    isRead(tf){
      if(!tf){
        return '안읽음'
      }
      return ''
    },
    // fn 함수는 채팅을 적으면 화면에 뿌려주는 역할을 한다.
    // data에는 백엔드에서 보낸 채팅 내용이 들어있다. ( req.app.get("io").to(roomId).emit("chat", chat) )
    fn(data){
      if (
        // 내가 적은 글
        // 글의 작성자가 나여야 하고,
        data.USER_ID == this.getUserId &&
        // 채팅 ( 디비에서 가져온 채팅이 아닌 채팅창에서 적은) 이 존재해야하며
        this.newChats[this.newChats.length - 1] &&
        // 전 채팅 작성시각이 같아야하고
        this.newChats[this.newChats.length - 1].CREATED_AT == this.showCreated(data.CREATED_AT) &&
        // 전 채팅 작성자가 나와 같아야 한다.
        this.newChats[this.newChats.length - 1].USER_ID == this.getUserId
      ){
        // 전 글의 시각을 숨김
        this.newChats[this.newChats.length - 1].CREATED_AT = ''
      }
      // 상대가 적은 글
      else if (
        data.USER_ID != this.getUserId &&
        this.newChats[this.newChats.length - 1] &&
        this.newChats[this.newChats.length - 1].CREATED_AT == this.showCreated(data.CREATED_AT) &&
        this.newChats[this.newChats.length - 1].USER_ID != this.getUserId
        ){
        this.newChats[this.newChats.length - 1].CREATED_AT = ''
        }
      // 채팅 추가
      const newChat = {IS_READ : this.isRead(data.IS_READ), MESSAGE : data.MESSAGE, CREATED_AT  : this.showCreated(data.CREATED_AT), USER_ID :  data.USER_ID}
      this.newChats.push(newChat)
    },
    fn2(data){
      const ul = document.querySelector('#ulList')
      const div = document.createElement('div')
      div.innerText = data || '서버와의 연결이 불량'
      ul.appendChild(div)
    },
    // 이건 상대방이 들어왔을 때 안읽음 표시 처리해주는 기능
    async fn3(){
      console.log('fn3')
      let data = {
        params: JSON.stringify([
          {
            USER_ID : this.getUserId,
            ROOM_ID : this.roomId,
            PAGE_SIZE : 1000,
            OFFSET_SIZE : 0,
          },
        ]),
      };
      const res = await axios.post(`${process.env.VUE_APP_CHAT_API}/get_chats`,data)
      // 내가 적거나 상대방이 적은 채팅들은 없애준다.
      this.newChats = []
      // store에 chat의 내용을 저장한다.
      this.setChats(res.data.data)
      // 이로써 DB에 있는 온전한 채팅들이 화면에 그려진다.

    }
  }
}
</script>
<style >
.mine {
  text-align: right;
}
.mine2 {
  text-align: right;
}
</style>
