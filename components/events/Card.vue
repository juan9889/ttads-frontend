<template>
  <div class=" justify-center">
    <v-card v-if="!vertical" class="d-flex flex-row" height="200px" max-width="960px" hover="true">
      <v-img class="white--text" width="355px" height="200px" :src="src"></v-img>
      <div class="d-flex flex-column aling-start">
        <v-card-title class="text-h5 px-4 py-1">{{ title.toUpperCase() }}</v-card-title>
        <v-card-text class="text-left px-4 py-0">
          <div>{{ date }} - {{ time }}</div>
          <div class="">{{ place }}</div>
        </v-card-text>
        <v-card-text class="text--primary text-left px-4 py-1">
          <div style="word-wrap: break-word;" class="d-none d-lg-flex">{{ description }}</div>
          <div style="word-wrap: break-word;" class="d-flex d-lg-none">{{ description.slice(0, 120) }}...</div>
        </v-card-text>
        <v-card-actions class="pa-1 pt-0 mt-auto justify-end">
          <v-btn class="ma-1" color="green lighten-2" outlined> {{ community }}</v-btn>
          <v-btn class="ma-1" color="green lighten-2" text>
            <v-icon> mdi-heart-outline </v-icon>
          </v-btn>

        </v-card-actions>
      </div>
    </v-card>

    <v-card v-if="vertical" class="mx-auto" min-width="290" max-width="355" hover="true">
      <v-img class="white--text align-end" max-height="200px" :src="src">
        <v-card-title class="text-h5 ">{{ title.toUpperCase() }}</v-card-title>
      </v-img>
      <v-card-subtitle class="pb-1 text-left"> {{ date }} - {{ time }}</v-card-subtitle>
      <v-card-text class="text--primary text-left">
        <div class="pb-1">{{ place }}</div>
        <div>{{ description }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green lighten-2" outlined> {{ community }} </v-btn>
        <v-btn color="green lighten-2" text>
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