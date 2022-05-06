<template>
  <v-app>
    <v-navigation-drawer
      v-model="value"
      app
    >
      <!-- --><NavList />
    </v-navigation-drawer>

    <v-app-bar
      dense
      color="blue"
      app
    >
      <v-app-bar-nav-icon @click.stop="toggle" />
      <v-toolbar-title style="color : white; font-size : 14px">
        치움 관리자 페이지
      </v-toolbar-title>
    <!-- -->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <router-view />
      </v-container>
    </v-main>

    <v-footer
      padless
    >
      <v-col
        class="text-center"
        cols="12"
      >
        {{ new Date().getFullYear() }} — <strong>CHIUM ADMIN PAGE</strong>
      </v-col>
    </v-footer>
    <v-overlay
      :value="getNowLoadingState"
      opacity="0.2"
    >
      <v-progress-circular
        :value="100"
        color="green"
        indeterminate
        size="40"
        :width="15"
      />
    </v-overlay>
  </v-app>
</template>

<script>
import {mapGetters,mapActions} from "vuex"
import NavList from "@/components/AppC/NavList"
export default {
  name: 'App',
  components : {
    NavList
  },
  data(){
    return{
      value : false
    }
  },
  computed : {
    ...mapGetters('common',['getNowLoadingState']),
    ...mapGetters('auth',['isLogged']),
  },
  watch : {
    isLogged(){
      this.checkIsLogged()
    }
  },
  created(){
    this.getWsteLists()
    this.checkIsLogged()
  },
  methods : {
    ...mapActions('common',['getWsteLists','checkIsLogged']),
    toggle(){
      this.value = !this.value
    }
  }
}
</script>
<style >
html {
    height: 100%;
}
</style>
