<template>
  <div>
    <h1 class="mt-5 mb-5 text-center text-h2">Eventos destacados</h1>
    <v-row class="justify-space-around">
      <div v-for="event in events" :key="event.id">
        <v-col xl="3" lg="4" md="6" sm="12" class="text-center">
          <EventsCard :event="event" />
        </v-col>
      </div>
    </v-row>
    <v-divider class="mt-10 mb-5"></v-divider>
    <h1 class="mt-5 mb-3 text-center text-h2">Comunidades</h1>
    <v-row class="justify-space-around">
      <div v-for="community in communities" :key="community.id">
        <CommunitiesCard :community="community" />
      </div>
    </v-row>

  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    events: [],
    communities: [],
  }),
  mounted() {
    this.getCommunities()
    this.getEvents()
  },
  methods: {
    getCommunities() {
      this.$axios.get("http://localhost:8080/api/communities")
        .then((data) => {
          this.communities = data.data
        }).catch((err) => {
          console.log(err)
        })
    },
    getEvents() {
      this.$axios.get("http://localhost:8080/api/events")
        .then((data) => {
          this.events = data.data
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>
