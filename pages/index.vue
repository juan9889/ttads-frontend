<template>
  <div>
    <h1 class="mt-5 mb-5 text-center text-h3">Eventos destacados</h1>
    <div class="d-flex flex-row flex-wrap justify-space-around">
      <SkeletonCard v-if="loadingEvents" :amount="6"></SkeletonCard>
      <div v-else v-for="event in events" :key="event.id" class="ma-5">
        <EventsCard :event="event" />
      </div>
    </div>
    <v-divider class="mt-10 mb-5"></v-divider>
    <h1 class="mt-5 mb-3 text-center text-h3">Comunidades</h1>
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
          this.events = data.data
          this.loadingEvents = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
