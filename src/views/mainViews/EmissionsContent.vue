<template>
  <div>
    <v-card class="main-order">
      <EmissionOrderInfoFirst />
      <EmissionCollectorListAreaOfInterest />
      <v-card class="collector-list">
        <v-row>
          <v-col>
            <EmissionMapCollectorListWithin />
          </v-col>
          <v-col>
            <EmissionCollectorListOpt />
            <EmissionCollectorListTableWithOpt />
          </v-col>
        </v-row>
      </v-card>
    </v-card>


    <v-card
      v-if="getBiddingInfo"
      class="collector-list"
    >
      <EmissionBiddingTable />
    </v-card>

    <v-card class="collector-list">
      <EmissionTransactionTable />
    </v-card>
  </div>
</template>
<script>
import EmissionOrderInfoFirst from "@/components/EmissionsContentC/EmissionOrderInfoFirst.vue"
import EmissionBiddingTable from "@/components/EmissionsContentC/EmissionBiddingTable.vue"
import EmissionCollectorListAreaOfInterest from "@/components/EmissionsContentC/EmissionCollectorListAreaOfInterest.vue"
import EmissionCollectorListOpt from "@/components/EmissionsContentC/EmissionCollectorListOpt.vue"
import EmissionCollectorListTableWithOpt from "@/components/EmissionsContentC/EmissionCollectorListTableWithOpt.vue"
import EmissionMapCollectorListWithin from "@/components/EmissionsContentC/EmissionMapCollectorListWithin.vue"
import EmissionTransactionTable from "@/components/EmissionsContentC/EmissionTransactionTable.vue"

import {mapActions,mapGetters} from "vuex"

export default {
  components : {
    EmissionOrderInfoFirst,
    EmissionBiddingTable,
    EmissionCollectorListAreaOfInterest,
    EmissionCollectorListOpt,
    EmissionCollectorListTableWithOpt,
    EmissionMapCollectorListWithin,
    EmissionTransactionTable
  },
  computed : {
    ...mapGetters('emissions',['getCollectorListAreaOfInterest','getBiddingInfo'])
  },
  async created(){
    await this.emissionSelected(this.$route.params.id)
    await this.collectorListAreaOfInterest()
    this.collectorListWithin()
  },

  methods : {
    ...mapActions('emissions',['emissionSelected','collectorListAreaOfInterest','collectorListWithin'])
  },

}
</script>
<style >
.main-order {
  padding : 30px;
}
.collector-list {
  margin-top : 30px;
}
</style>
