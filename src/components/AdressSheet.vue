<template>
  <!-- <v-bottom-sheet>
    <template #activator="{on}">
      <v-btn
        color="red"
        dark
        v-on="on"
      >
        Open Inset
      </v-btn>
    </template>
    <v-sheet>
      버튼
    </v-sheet>
  </v-bottom-sheet> -->
  <div>
    <input
      type="text"
      :placeholder="$attrs.ph"
    >
    {{ $attrs }}
    {{ $listeners }}
    <chd
      v-bind="$attrs"
      hoho="gogogo"
      v-on="$listeners"
    />
    <button v-on="$listeners">
      여기어때
    </button>
  </div>
</template>
<script>
import chd from "@/components/ChildChild.vue"
export default {
components : {
  chd
}
}
</script>
<style lang="">

</style>
