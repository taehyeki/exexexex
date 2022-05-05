<template>
  <v-app>
    <v-navigation-drawer
      v-model="value"
      app
    >
    <!-- -->
    </v-navigation-drawer>

    <v-app-bar

      app
    >
      <v-app-bar-nav-icon @click.stop="toggle" />
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

export default {
  name: 'App',
  data(){
    return{
      value : false
    }
  },
  computed : {
    ...mapGetters('common',['getNowLoadingState'])
  },
  created(){
    this.getWsteLists()

  },
  methods : {
    ...mapActions('common',['getWsteLists']),
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
