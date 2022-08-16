<template>
  <v-card class="mx-auto" min-width="290" max-width="355">
    <v-icon :color="event.event_category.iconColor" class="icons mt-2 d-flex justify-center" x-large>
      mdi-{{ event.event_category.icon }}
    </v-icon>
    <v-card-title class="pb-0 text-h5">{{ event.title.toUpperCase() }}</v-card-title>
    <v-card-title class="pt-0 pb-3 text-subtitle-1 "># {{ event.event_category.name }} - {{ event.community.name }}
    </v-card-title>
    <!-- <v-card-text class=" pb-2 text--primary text-left">
      <div>{{ event.description }}</div>
    </v-card-text> -->
    <!-- <v-card-subtitle class="pb-0 pt-0 text-left"> {{ event.place }}</v-card-subtitle> -->
    <v-card-subtitle class="pb-0 pt-0 text-left"> {{ event.city.name }} - {{ event.city.province.name }}
    </v-card-subtitle>
    <v-card-subtitle class="pb-1 pt-0 text-left"> {{ event.date }} - {{ event.time }}</v-card-subtitle>
    <v-card-actions class="pa-1 pt-0 justify-space-around">
      <v-btn class="ma-1" color="blue-grey lighten-1" outlined :to="'/communities?id=' + event.community.id.toString()">
        Ver Comunidad</v-btn>
      <EventsDetails :event="event"></EventsDetails>
    </v-card-actions>
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
    event: Object,
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