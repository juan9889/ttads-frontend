<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="290">
      <template v-id v-slot:activator="{on, attrs}">
        <v-btn class="ma-1" color="eventButton" v-bind="attrs" v-on="on"> Detalles </v-btn>
      </template>
      <v-card class="evento mx-auto text-center" min-width="290" max-width="355">
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
        <v-card-text class="text--primary text-left pt-1">
        <v-chip v-if="event.user_events.length == 1" color="secondary">{{ event.user_events.length }} seguidor</v-chip>
        <v-chip v-else color="secondary">{{ event.user_events.length }} seguidores</v-chip>
      </v-card-text>
        <v-card-actions class="pa-1 pt-0 justify-space-around">
          <v-btn class="ma-1" color="eventButton2" outlined :to="'/communities?id=' + event.community.id.toString()">
            Ver Comunidad</v-btn
          >
          <v-btn v-if="joined" class="ma-1" color="eventButton2" @click="unfollow" outlined>Abandonar</v-btn>
          <v-btn v-if="joined==false" class="ma-1" color="eventButton2" @click="follow" outlined>Seguir</v-btn>
        </v-card-actions>
        <v-card-actions class="pa-1 pt-0 justify-space-around">
          <EventsAbm v-if="true" :mode="'U'" :communityId="event.community.id" :eventId="event.id" />
        </v-card-actions>
        <v-card-actions class="pa-1 pt-0 justify-space-around">
          <EventsAbm v-if="true" :mode="'D'" :communityId="event.community.id" :eventId="event.id" />
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
.evento {
  border: 1px solid rgb(0, 121, 107, 0.1) !important;
  box-shadow: none;
}
</style>
<script>
export default {
  data() {
    return {
      dialog: false,
<<<<<<< HEAD
    }
  },
  props: {
    event: Object,
=======
      loading: true,
      joined: false,
      event: {},
    }
  },
  methods: {
    getEventsDetails(id) {
      this.$axios
        .get('events/' + id)
        .then((data) => {
          this.event = data.data
          this.loading = false
          this.event.user_events.forEach(this.search)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    search(item) {
      if (item.userId == this.$store.state.auth.user.id) {
        this.joined = true
        
        
      }
      
    },
    async follow() {
      try{
        await this.$axios.post('/events/' + this.event.id + '/follow');
        this.joined=true;
      }catch (e) {
        console.log(e)
      }
    },
    async unfollow() {
      try{
        await this.$axios.post('/events/' + this.event.id + '/follow');
        this.joined=false;
      }catch (e) {
        console.log(e)
      }
    }
>>>>>>> 2d30c60ea48a3fc9c0af5d8448b0288199ae4a39
  },
  methods: {},
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
