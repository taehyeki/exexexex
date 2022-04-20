<template>
  <v-main>
    <TopInfo />
    <DataTable />
    <v-row>
      <CalenDars />
    </v-row>
  </v-main>
</template>
<script>
import axios from 'axios'
import CalenDars from '@/components/CalenDars.vue'
import DataTable from '@/components/DataTable.vue'
import TopInfo from '@/components/TopInfo.vue'
  export default {
    components : {
      CalenDars,DataTable,TopInfo
    },
    async created(){
      const res = await axios.post('http://192.168.0.46:3000/api/admin/1_01_main',{user_id:358})
      console.log(res)
    }

  }
</script>

