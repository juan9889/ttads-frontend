<template>
  <div>
    <v-card class="evento mx-auto text-center" max-width="290">
      <v-icon :color="event.event_category.iconColor" class="icons mt-2" x-large>
        mdi-{{ event.event_category.icon }}
      </v-icon>
      <v-card-title class="pb-0 text-h6">{{ event.title.toUpperCase() }}</v-card-title>
      <v-card-title class="pt-0 pb-3 text-subtitle-1 text-left"
        ># {{ event.event_category.name }} - {{ event.community.name }}
      </v-card-title>
      <v-card-subtitle class="pb-1 pt-0 text-left">
        {{ event.city.name }} - {{ event.city.province.name }} -
        {{ event.date }}
      </v-card-subtitle>
      <v-card-text class="text--primary text-left pt-1">
        <v-chip v-if="event.user_events.length == 1" color="secondary">{{ event.user_events.length }} seguidor</v-chip>
        <v-chip v-else color="secondary">{{ event.user_events.length }} seguidores</v-chip>
      </v-card-text>
      <v-card-actions class="pa-1 pt-0 justify-space-around">
        <v-btn class="ma-1" color="eventButton" :to="'/communities?id=' + event.community.id.toString()">
          Ver Comunidad
        </v-btn>
        <EventsDetails :eventId="event.id"></EventsDetails>
      </v-card-actions>
    </v-card>
  </div>
</template>
<style scoped>
.icons {
  font-size: 95px !important;
}
.evento {
  border: 1px solid rgb(0, 121, 107, 0.1) !important;
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
