<template>
  <v-card class="community mx-2 mb-3" max-width="250">
    <v-icon :color="community.comm_category.iconColor" class="icons mt-2 d-flex justify-center" x-large>
      mdi-{{ community.comm_category.icon }}
    </v-icon>
    <v-card-title class="pb-0 text-h6">{{ community.name }}</v-card-title>
    <v-card-title class="pt-0 pb-1 text-left text-subtitle-1">#{{ community.comm_category.name }}</v-card-title>
    <v-card-text class="text--primary text-left">{{ community.description }}</v-card-text>
    <v-card-text class="text--primary text-left pt-0">
      <v-chip v-if="community.user_communities.length == 1" color="secondary">{{ community.user_communities.length }} miembro</v-chip>
      <v-chip v-else color="secondary">{{ community.user_communities.length }} miembros</v-chip>
    </v-card-text>
    <v-card-actions class="pa-1 pt-0 justify-space-around">
      <v-btn class="ma-1" color="commuButton" :to="'/communities?id=' + community.id.toString()"> Ver Eventos </v-btn>
      <v-btn v-if="joined==false" class="ma-1" @click="join" color="commuButton">Unirse</v-btn>
      <v-btn v-if="joined" class="ma-1" @click="unjoin" color="orange">Des-Unirse</v-btn>
    </v-card-actions>
  </v-card>
  
</template>

<style scoped>
.icons {
  font-size: 95px !important;
}
.community {
  border: 1px solid rgba(82, 45, 168, 0.15) !important;
}
</style>

<script>
import {mapGetters} from 'vuex'
export default {
  props: {
    community: Object,
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data: () => ({
    joined: false,
  }),
  mounted() {
    this.detect_joined();
  },
  methods: {
    detect_joined() {
      this.community.user_communities.forEach(this.search);
    },
    search(item) {
      if (item.userId == this.$store.state.auth.user.id) {
        this.joined = true
      }
    },
    async unjoin() {
      try {
        const response = await this.$axios.post('/communities/' + this.community.id + '/join')
        this.joined=false;
        
      } catch (e) {
        console.log(e)
      }
    },
    async join() {
     
      try {
        
        const response = await this.$axios.post('/communities/' + this.community.id + '/join')
        this.joined=true;
        
      } catch (e) {
        console.log(e)
      }
    },
  },

}
</script>
