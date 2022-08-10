<template>
  <div>
    <h1 class="text-center text-h3 mb-4">Explorar</h1>
    <v-row justify="center">
      <v-col xs="12" sm="12" md="2" class="pt-3">
        <h3 class="text-h5 text-center">Eventos</h3>
        <v-row class="justify-space-around">
          <div v-for="event in events" :key="event.id">
            <v-col xl="3" lg="4" md="6" sm="12" class="text-center">
              <EventsCard :event="event" />
            </v-col>
          </div>
        </v-row>
      </v-col>
      <v-col xs="12" sm="12" md="10">
        <h3 class="mb-4 text-h4 text-center">Comunidades</h3>
        <v-row class="justify-space-around">
          <template v-if="loading">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
          </template>
          <CommunitiesDetails v-else :community="community" />
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    events: [],
    community: [],
  }),
  mounted() {
    console.log("ruta: " + parseInt(this.$route.query.id))
    this.getCommunity(parseInt(this.$route.query.id));
    this.getCommunityEvents(parseInt(this.$route.query.id))
  },
  methods: {
    getCommunity(id) {
      this.loading = true
      this.$axios.get("http://localhost:8080/api/communities/" + id)
        .then((data) => {
          this.community = data.data

          console.log(typeof(this.community))
          console.log(JSON.stringify(this.community))
          this.loading = false
        }).catch((err) => {
          console.log(err)
        })
    },
    getCommunityEvents(id) {
      this.$axios.get("http://localhost:8080/api/communities/" + id + "/events")
        .then((data) => {
          this.events = data.data[0]['events']
          console.log(JSON.stringify(this.events))
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>