<template>
  <div class=" justify-center">
    <v-card v-if="!vertical" class="d-flex flex-row" height="200px" max-width="960px" hover="true">
      <v-img class="white--text" width="355px" height="200px" :src="src"></v-img>
      <div class="d-flex flex-column aling-start">
        <v-card-title class="text-h5 px-4 py-1">{{ community.toUpperCase() }}</v-card-title>
        <v-card-text class="text-left px-4 py-0">#{{category}}</v-card-text>
        <v-card-text class="text--primary text-left px-4 py-1">
          <div style="word-wrap: break-word;" class="d-none d-lg-flex">{{ description }}</div>
          <div style="word-wrap: break-word;" class="d-flex d-lg-none">{{ description.slice(0, 120) }}...</div>
        </v-card-text>
        <v-card-actions class="pa-2 pt-0 mt-auto justify-end">
          <v-btn class="ma-1" color="blue lighten-2" outlined>Ver Eventos</v-btn>
          <v-btn class="ma-1" color="blue lighten-2" outlined>Unirse</v-btn>
        </v-card-actions>
      </div>
    </v-card>

    <v-card v-if="vertical" class="mx-auto" min-width="290" max-width="355" hover="true">
      <v-img class="white--text align-end" max-height="200px" :src="src">
        <v-card-title class="text-h5 ">{{ community.toUpperCase() }}</v-card-title>
      </v-img>
      <v-card-subtitle class="pb-1 text-left">#{{category}}</v-card-subtitle>
      <v-card-text class="text--primary text-left">{{description}}</v-card-text>
      <v-card-actions class="pa-1 pt-0">
        <v-spacer></v-spacer>
        <v-btn class="ma-1" color="blue lighten-2" outlined>Ver Eventos</v-btn>
        <v-btn class="ma-1" color="blue lighten-2" outlined>Unirse</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<style scoped>
</style>

<script>
export default {
  props: {
    vertical: Boolean,
    community: String,
    category: Date,
    description: String,
    src: String,
  }
}
</script>