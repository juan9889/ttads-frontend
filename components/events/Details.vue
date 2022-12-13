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
        <v-card-title class="pb-0 text-subtitle-1">{{ event.title.toUpperCase() }}</v-card-title>
        <v-card-title class="pt-0 pb-1 text-body-2"
          >#{{ event.event_category.name }} - {{ event.community.name }}
        </v-card-title>
        <v-card-text class="pb-1 text-body-2 text-left">
          <div>"{{ event.description }}"</div>
        </v-card-text>
        <v-card-subtitle class="pb-0 pt-0 text-left"> {{ event.place }}</v-card-subtitle>
        <v-card-subtitle class="pb-0 pt-0 text-left">
          {{ event.city.name }} - {{ event.city.province.name }}
        </v-card-subtitle>
        <v-card-subtitle class="pb-1 pt-0 text-left"> {{ event.date }} - {{ event.time }}</v-card-subtitle>
        <v-card-text class="text--primary text-left pt-1">
          <v-chip v-if="seguidores == 1" color="secondary">{{ seguidores }} seguidor</v-chip>
          <v-chip v-else color="secondary">{{ seguidores }} seguidores</v-chip>
        </v-card-text>
        <v-card-actions class="pa-1 pt-0 justify-space-around">
          <v-btn class="ma-1" color="eventButton2" outlined :to="'/communities?id=' + event.community.id.toString()">
            Ver Comunidad</v-btn
          >
          <v-btn v-if="joined" class="ma-1" color="eventButton2" @click="unfollow" outlined>Abandonar</v-btn>
          <v-btn v-if="joined == false" class="ma-1" color="eventButton2" @click="follow" outlined>Seguir</v-btn>
        </v-card-actions>
        <v-card-actions class="pa-1 pt-0 justify-space-around">
          <EventsAbm v-if="isMod" :mode="'U'" :communityId="event.community.id" :eventId="event.id" />
        </v-card-actions>
        <v-card-actions class="pa-1 pt-0 justify-space-around">
          <EventsAbm v-if="isMod" :mode="'D'" :communityId="event.community.id" :eventId="event.id" />
        </v-card-actions>
      </v-card> </v-dialog
    ><FormsNotification
      :show="noti.show"
      :notiType="noti.notiType"
      :header="noti.header"
      :text="noti.text"
      @notification="notification"></FormsNotification>
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
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data() {
    return {
      dialog: false,
      loading: true,
      joined: false,
      isMod: false,
      seguidores: this.event.user_events.length,
      miembro: null,
      noti: {
        show: false,
        notiType: true,
        header: '',
        text: '',
      },
    }
  },
  props: {
    event: Object,
  },
  mounted() {
    this.event.user_events.forEach(this.search)
    this.getCommunity(this.event.community.id)
  },
  methods: {
    async notification(success) {
      if (success == true) {
        if (this.miembro == false) {
          this.miembro = true
          await this.follow()
          this.noti.show = false
        }
      } else {
        this.noti.show = false
      }
    },
    search(item) {
      if (item.userId == this.$store.state.auth.user.id) {
        this.joined = true
      }
      if (item.mod == true) {
        this.isMod = true
      }
    },
    async getCommunity(id) {
      try {
        const data = await this.$axios.get('/communities/' + id)
        console.log(JSON.stringify(data.data.user_communities))
        data.data.user_communities.forEach((item) => {
          if (item.userId == this.$store.state.auth.user.id) {
            this.miembro = true
            if (item.mod == true) {
              this.isMod = true
            }
          } else {
            this.miembro = false
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async follow() {
      try {
        if (this.miembro == true) {
          const response = await this.$axios.post('/events/' + this.event.id + '/follow')
          this.joined = true
          this.seguidores = this.seguidores + 1
          if (response.status != 200) {
            throw response
          }
        } else {
          this.noti.header = '¿Unirte a la comunidad?'
          this.noti.text = 'Para seguir al evento debes ser mimbro de la comunidad'
          this.noti.notiType = false
          this.noti.show = true
        }
      } catch (e) {
        this.noti.header = 'Error al unirse a la comunidad'
        this.noti.text = 'Error' + e.response.status + ': ' + e.response.data.message
        this.noti.notiType = false
        this.noti.show = true
      }
    },
    async unfollow() {
      try {
        await this.$axios.post('/events/' + this.event.id + '/follow')
        this.joined = false
        this.seguidores = this.seguidores - 1
      } catch (e) {
        console.log(e)
      }
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
