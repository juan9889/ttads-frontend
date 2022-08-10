<template>

  <v-card class="mx-2 mb-3" mx-width="350">
    {{community}}
    <!-- <v-icon :color="community.comm_category.iconColor" class="icons mt-2 d-flex justify-center" x-large>
      mdi-{{ community.comm_category.icon }}
    </v-icon>
    <v-card-title class="text-h5 ">{{ community.name.toUpperCase() }}</v-card-title>
    <v-card-subtitle class="pb-1 text-left">#{{ community.comm_category.name }}</v-card-subtitle>
    <v-card-text class="text--primary text-left">{{ community.description }}</v-card-text>
    <v-card-actions class="pa-1 pt-0 justify-space-around">
      <v-btn class="ma-1" color="blue-grey lighten-1" outlined>Ver Eventos</v-btn>
      <v-btn class="ma-1" color="blue-grey lighten-1" outlined>Unirse</v-btn>
    </v-card-actions> -->
  </v-card>

</template>

<style scoped>
.icons {
  font-size: 95px !important;
}
</style>

<script>
export default {
  props: {
    community: Object,
  }
}
</script>