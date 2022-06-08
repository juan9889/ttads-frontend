<template>
  <div >
    <br />
    <br />
     <br />
    <br />
    <v-container class="fill-height">
      
    <v-row
        align="center"
        justify="center"
      >
      <v-col align="center">
      <admin-panel-logo></admin-panel-logo>
      </v-col>
    </v-row>
    </v-container>
  </div>
</template>


<script>
import AdminPanelLogo from '~/components/adminpanel/AdminPanelLogo.vue'
  export default {
  components: { AdminPanelLogo },
    layout: 'adminLayout'
    // page component definitions
  }
</script>