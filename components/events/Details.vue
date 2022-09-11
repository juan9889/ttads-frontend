<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="290">
      <template v-id v-slot:activator="{on, attrs}">
        <v-btn @click.prevent="getEventsDetails(eventId)" class="ma-1" color="eventButton" v-bind="attrs" v-on="on">
          Detalles
        </v-btn>
      </template>
      <v-skeleton-loader v-if="loading" type="card-avatar, article, actions"> </v-skeleton-loader>
      <v-card v-else class="mx-auto text-center" min-width="290" max-width="355">
        <v-icon :color="event.event_category.iconColor" class="icons mt-2">
          mdi-{{ event.event_category.icon }}
        </v-icon>
        <v-btn absolute top right color="contrastButton" text @click="dialog = false">X</v-btn>
        <v-card-title class="pb-0 text-h6">{{ event.title.toUpperCase() }}</v-card-title>
        <v-card-title class="pt-0 pb-1 text-subtitle-1"
          >#{{ event.event_category.name }} - {{ event.community.name }}
        </v-card-title>
        <v-card-text class="pb-1 text-body-1 text-left">
          <div>"{{ event.description }}"</div>
        </v-card-text>
        <v-card-subtitle class="pb-0 pt-0 text-left"> {{ event.place }}</v-card-subtitle>
        <v-card-subtitle class="pb-0 pt-0 text-left">
          {{ event.city.name }} - {{ event.city.province.name }}
        </v-card-subtitle>
        <v-card-subtitle class="pb-1 pt-0 text-left"> {{ event.date }} - {{ event.time }}</v-card-subtitle>
        <!-- <v-card-subtitle class="pb-1 pt-0 text-left"> Ultima modificacion: {{ event.updatedAt }}
        </v-card-subtitle> -->
        <v-card-actions class="pa-1 pt-0 justify-space-around">
          <v-btn class="ma-1" color="eventButton2" outlined :to="'/communities?id=' + event.community.id.toString()">
            Ver Comunidad</v-btn
          >
          <v-btn class="ma-1" color="eventButton2" outlined>Seguir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style scoped>
.icons {
  font-size: 95px !important;
}
.v-dialog {
  overflow-y: hidden !important;
}
</style>
<script>
export default {
  props: {
    eventId: Number,
  },
  data() {
    return {
      dialog: false,
      loading: true,
      event: {},
    }
  },
  methods: {
    getEventsDetails(id) {
      this.$axios
        .get('events/' + id)
        .then((data) => {
          this.event = data.data[0]
          this.loading = false
          console.log(JSON.stringify(this.event))
        })
        .catch((err) => {
          console.log(err)
        })
    },
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
