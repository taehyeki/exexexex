<template>
  <v-card style="overflow : hidden; display : flex">
    <div style="width : 50%">
      <v-img
        height="100%"
        lazy-src="https://picsum.photos/id/11/10/6"
        src="https://picsum.photos/id/11/500/300"
      />
    </div>
    <div
      class="right-login-box"
    >
      <div>
        <v-row>
          <v-col class="input-label">
            <v-subheader>아이디</v-subheader>
          </v-col>
          <v-col>
            <v-text-field v-model="adminId" />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="input-label">
            <v-subheader>비밀번호</v-subheader>
          </v-col>
          <v-col>
            <v-text-field
              v-model="adminPw"
              type="password"
            />
          </v-col>
        </v-row>
        <v-row justify="end">
          <v-col cols="auto">
            <v-btn @click="loginBtn">
              로그인
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-card>
</template>
<script>
import {mapActions} from "vuex"
export default {
  data(){
    return {
      adminId : '',
      adminPw : ''
    }
  },
  methods : {
    ...mapActions('auth', ['login']),
    loginBtn(){
      this.login({adminId : this.adminId, adminPw : this.adminPw})
    }
  }
}
</script>
<style lang="scss">
.right-login-box {
  width : 50%;
  padding : 20px;
  display : flex;
  justify-content: center;
  align-items: center;
  .input-label {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
