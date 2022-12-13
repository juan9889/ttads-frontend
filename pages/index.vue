<template>
  <div>
    <h1 class="mt-5 mb-5 text-center text-h4 text-sm-h3">Eventos destacados</h1>
    <div class="d-flex flex-row flex-wrap justify-space-around">
      <SkeletonCard v-if="loadingEvents" :amount="6"></SkeletonCard>
      <div v-else v-for="event in events" :key="event.id" class="ma-5">
        <EventsCard :event="event" />
      </div>
    </div>
    <v-divider class="mt-10 mb-5"></v-divider>
    <h1 class="mt-5 mb-3 text-center text-h4 text-sm-h3">Comunidades</h1>
    <div class="d-flex flex-row flex-wrap justify-space-around">
      <SkeletonCard v-if="loadingCommunities" :amount="6"></SkeletonCard>
      <div v-else v-for="community in communities" :key="community.id">
        <CommunitiesCard :community="community" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  name: 'Home',
  data: () => ({
    events: [],
    communities: [],
    loadingCommunities: true,
    loadingEvents: true,
  }),
  mounted() {
    this.getCommunities()
    this.getEvents()
  },
  methods: {
    getCommunities() {
      this.$axios
        .get('communities')
        .then((data) => {
          this.communities = data.data
            .sort((a, b) => {
              const a_length = a.user_communities.length
              const b_length = b.user_communities.length
              if (a_length == b_length) {
                return 0
              }
              if (a_length > b_length) {
                return -1
              }
              return 1
            })
            .slice(0, 10)
          this.loadingCommunities = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getEvents() {
      this.$axios
        .get('events')
        .then((data) => {
          // Guardar en una variable los 10 eventos con más seguidores.
          this.events = data.data
            .sort((a, b) => {
              const a_length = a.user_events.length
              const b_length = b.user_events.length
              if (a_length == b_length) {
                return 0
              }
              if (a_length > b_length) {
                return -1
              }
              return 1
            })
            .slice(0, 10)
          this.loadingEvents = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async testauth() {
      var resultado = this.$axios.get('users/esaut')
      alert(resultado)
    },
  },
}
</script>
