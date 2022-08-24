<template>
  <div>
    <v-card class="mx-auto" min-width="290" max-width="355">
      <v-icon
        :color="event.event_category.iconColor"
        class="icons mt-2 d-flex justify-center"
        x-large
      >
        mdi-{{ event.event_category.icon }}
      </v-icon>
      <v-card-title class="pb-0 text-h5">{{
        event.title.toUpperCase()
      }}</v-card-title>
      <v-card-title class="pt-0 pb-3 text-subtitle-1"
        ># {{ event.event_category.name }} - {{ event.community.name }}
      </v-card-title>
      <v-card-subtitle class="pb-1 pt-0 text-left">
        {{ event.city.name }} - {{ event.city.province.name }} -
        {{ event.date }}
      </v-card-subtitle>
      <v-card-actions class="pa-1 pt-0 justify-space-around">
        <v-btn
          class="ma-1"
          color="blue-grey lighten-1"
          outlined
          :to="'/communities?id=' + event.community.id.toString()"
        >
          Ver Comunidad</v-btn
        >
        <EventsDetails :eventId="event.id"></EventsDetails>
      </v-card-actions>
    </v-card>
  </div>
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
  },
}
</script>

<style>
/* Backgrount blured except text. */
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.8;
  position: absolute;
  width: 100%;
}

.align-right {
  position: absolute;
  right: 0;
}
</style>
