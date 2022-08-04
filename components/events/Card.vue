<template>
  <v-hover v-slot="{ hover }">
    <div class=" justify-center">
      <v-card v-if="vertical" class="mx-auto" min-width="290" max-width="355" >
        <v-img class="white--text align-end" max-height="90px" :src="src">
          <v-card-title class="text-h6">{{ title.toUpperCase() }}</v-card-title>
          <v-expand-transition>
            <div v-if="hover"
              class="d-flex transition-fast-in-fast-out primary darken-2 text-h2 white--text v-card--reveal"
              style="height: 100%;">
              <v-card-text class="text--primary text-left">
                <div class="pb-1">{{ place }}</div>
                <div>{{ description.slice(0, 80) }}</div>
              </v-card-text>
            </div>
          </v-expand-transition>
        </v-img>
        <v-card-actions class="pt-4 pb-4 pl-3">
          <div class="color-primary--text" absolute left>
            {{ date }} - {{ time }}
          </div>
          <div class="align-right">
            <v-btn color="green lighten-2" outlined>
              {{ community }}
            </v-btn>
            <v-btn color="green lighten-2" text>
              <v-icon> mdi-heart-outline </v-icon>
            </v-btn>
          </div>
        </v-card-actions>

      </v-card>

    </div>
  </v-hover>
</template>

<script>
export default {
  props: {
    vertical: Boolean,
    title: String,
    date: String,
    time: String,
    place: String,
    description: String,
    community: String,
    src: String,
  }
}
</script>

<style>
/* Backgrount blured except text. */
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .8;
  position: absolute;
  width: 100%;
}

.align-right {
  position: absolute;
  right: 0;
}
</style>