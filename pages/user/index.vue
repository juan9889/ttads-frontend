<template>
  <div>
    <h1 class="mt-5 mb-5 text-center text-h3">Perfil de {{ name }}</h1>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <div class="d-flex flex align-center" style="height: 100%">
          <UsersUpdate></UsersUpdate>
        </div>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <UsersPassword></UsersPassword>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <UsersDelete></UsersDelete>
      </v-col>
    </v-row>
    <div>
      <h1 class="mt-5 mb-5 text-center text-h3">Eventos seguidos</h1>
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
  </div>
</template>
<script>
export default {
  data: () => ({
    success: false,
    name: '',
    loadingCommunities: false,
    loadingEvents: false,
    events: [],
    communities: [],
  }),
  props: {
    userId: Number,
  },
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        const user = await this.$axios.get('/users/me')
        this.name = user.data.data.name
      } catch (e) {
        console.log(e.message)
      }
    },
    getUserEvents() {},
    getUserCommunities() {},
  },
  watch: {},
}
</script>
