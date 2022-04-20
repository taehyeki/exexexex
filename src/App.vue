<template>
  <v-app>
    <v-overlay
      :value="loading"
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
    <router-view />
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components : {

  },
  data() {
    return {
      loading : this.$store.state.common.loading
    }
  }

};
</script>
