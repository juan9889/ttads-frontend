<template>
  <v-card class="mx-auto d-flex flex-row" max-height="200px" hover="true">
    <div>
      <v-img class="white--text align-end" max-width="400px" height="200px" :src="src"></v-img>
    </div>
    <div class="">
      <v-card-title class="px-4 py-2">{{ title.toUpperCase() }}</v-card-title>
      <v-card-text class="text-left px-4 py-0">
        <div>{{ date }} - {{ time }}</div>
        <div class="">{{ place }}</div>
      </v-card-text>
      <v-card-text class="text--primary text-left px-4 py-1">
        <div class="">{{ description }}</div>
      </v-card-text>
      <v-card-actions class="d-flex flex-row-reverse">
        <v-btn color="orange" text>
          <v-icon> mdi-heart-outline </v-icon>
        </v-btn>
        <v-btn color="orange" text> {{ community }}</v-btn>

      </v-card-actions>
    </div>
  </v-card>
</template>
<style scoped>
</style>

<script>
export default {
  props: {
    title: String,
    date: Date,
    time: String,
    place: String,
    description: String,
    community: String,
    src: String,
  },
}
</script>