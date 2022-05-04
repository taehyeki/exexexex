<template>
  <div>
    <v-dialog
      :value="value"
    >
      <v-row

        style="padding : 0; margin : 0; "
      >
        <v-col
          style="padding : 0; height : 789px"
          cols="7"
        >
          <v-card style="height : 100%">
            <v-card-title> 1:1 문의 내역</v-card-title>
          </v-card>
        </v-col>
        <v-col
          style="padding : 0"
          cols="5"
        >
          <v-row style="padding : 0; margin : 0; ">
            <v-col>
              <v-card>
                <v-row
                  v-for="title, idx in list1"
                  :key="idx"
                >
                  <v-col cols="4">
                    <v-subheader>{{ title }}</v-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field
                      v-if="title != '내용' "
                      readonly
                    />
                    <v-textarea
                      v-else
                      readonly
                    />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
          <v-row style="padding : 0; margin : 0; ">
            <v-col>
              <v-card>
                <v-row
                  v-for="title, idx in list2"
                  :key="idx"
                >
                  <v-col cols="4">
                    <v-subheader>{{ title }}</v-subheader>
                  </v-col>
                  <v-col cols="8">
                    <v-text-field v-if="title != '답변' " />
                    <v-textarea v-else />
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-spacer />
      <SimpleDialog :value="value2" />
    </v-dialog>
  </div>
</template>
<script>
import SimpleDialog from "@/components/SimpleDialog.vue"
export default {
  components : {
    SimpleDialog
  },
  props : {
    value : {
      type : Boolean,
      default : false
    }
  },
  data (){
    return {
      list1 : ['본문','작성자','제목','내용'],
      list2 : ['작성일','작성자','답변'],
      value2 : false
    }
  },
}
</script>
<style lang="scss">
.v-dialog.v-dialog--active {
  margin : 0;
  width : 1080px;
  height: 789px;
  margin-left : 240px
}

</style>
