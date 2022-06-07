<template>
  <v-card class="mx-auto" min-width="280" max-width="400" hover="true">
    <v-img class="white--text align-end" height="200px" :src="src">
      <v-card-title>{{ title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-1 text-left"> {{ date }} </v-card-subtitle>

    <v-card-text class="text--primary text-left" >
      <div class="pb-1">{{ place }}</div>

      <div>{{ description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="orange" text> {{ community }} </v-btn>

      <v-btn color="orange" text> <v-icon> mdi-heart-outline </v-icon></v-btn>
    </v-card-actions>
  </v-card>
</template>
<style scoped>

</style>

<script>
export default {
  props: {
    title: String,
    date: String,
    place: String,
    description: String,
    community: String,
    src: String,
  },
}
</script>