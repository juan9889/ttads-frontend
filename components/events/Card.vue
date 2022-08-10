<template>
  <v-card class="mx-auto" min-width="290" max-width="355">
    <v-icon :color="event.event_category.iconColor" class="icons mt-2 d-flex justify-center" x-large>
      mdi-{{ event.event_category.icon }}
    </v-icon>
    <v-card-title class="text-h5">{{ event.title }}</v-card-title>
    <v-card-subtitle class="pb-1 text-subtitle-1 ">#{{ event.event_category.name }} - {{ event.community.name }}
    </v-card-subtitle>
    <v-card-text class=" pb-2 text--primary text-left">
      <div>{{ event.description }}</div>
    </v-card-text>
    <v-card-subtitle class="pb-0 pt-0 text-left"> {{ event.place }}</v-card-subtitle>
    <v-card-subtitle class="pb-0 pt-0 text-left"> {{ event.city.name }} - {{ event.city.province.name }}</v-card-subtitle>
    <v-card-subtitle class="pb-1 pt-0 text-left"> {{ event.date }} - {{ event.time }}</v-card-subtitle>
    <v-card-actions class="pa-1 pt-0 justify-space-around">
      <v-btn class="ma-1" color="blue-grey lighten-1" outlined>Ver Comunidad</v-btn>
      <v-btn class="ma-1" color="blue-grey lighten-1" outlined>Seguir</v-btn>
    </v-card-actions>
  </v-card>
  <!-- <v-hover v-slot="{ hover }">
    <div class=" justify-center">
      <v-card class="mx-auto" min-width="290" max-width="355" >
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
  </v-hover> -->
</template>

<style scoped>
.icons {
  font-size: 95px !important;
}
</style>

<script>
export default {
  props: {
    event: Object,
  }
}
</script>

<!-- <style>
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
</style> -->