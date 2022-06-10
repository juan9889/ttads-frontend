<template>
  <div class=" justify-center">
    <v-card v-if=" !vertical" class="d-flex flex-row" max-height="200px" max-width="960px" hover="true">
    <v-img class="white--text" style="flex-basis: 40%;" height="200px" :src="src"></v-img>
    <div class="d-flex flex-column justify-space-between flex-wrap">
      <v-card-title class="px-4 py-1">{{ title.toUpperCase() }}</v-card-title>
      <v-card-text class="text-left px-4 py-0">
        <div>{{ date }} - {{ time }}</div>
        <div class="">{{ place }}</div>
      </v-card-text>
      <v-card-text class="text--primary text-left px-4 py-1">
        <div style="word-wrap: break-word;" class="d-none d-lg-flex">{{ description }}</div>
        <div style="word-wrap: break-word;" class="d-flex d-lg-none">{{ description.slice(0, 120) }}...</div>
      </v-card-text>
      <v-card-actions class="pa-1 pt-0 flex-row-reverse">
        <v-btn color="orange" text>
          <v-icon> mdi-heart-outline </v-icon>
        </v-btn>
        <v-btn color="orange" text> {{ community }}</v-btn>
      </v-card-actions>
    </div>
    </v-card>

    <v-card v-if="vertical" class="mx-auto" min-width="280" max-width="400" hover="true">
      <v-img class="white--text align-end" height="200px" :src="src">
        <v-card-title>{{ title.toUpperCase() }}</v-card-title>
      </v-img>
      <v-card-subtitle class="pb-1 text-left"> {{ date }} - {{ time }}</v-card-subtitle>
      <v-card-text class="text--primary text-left">
        <div class="pb-1">{{ place }}</div>
        <div>{{ description }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="orange" text> {{ community }} </v-btn>
        <v-btn color="orange" text>
          <v-icon> mdi-heart-outline </v-icon>
        </v-btn>
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
    title: String,
    date: Date,
    time: String,
    place: String,
    description: String,
    community: String,
    src: String,
  }
}
</script>