<template>
  <div>
    <v-row justify="center">
      <v-col xs="12" sm="12" md="6" lg="7" xl="8" class="pt-3">
        <h3 class="text-h3 text-center">Eventos</h3>
        <div class="d-flex flex-row justify-start align-center flex-wrap">
          <v-select v-model="selectedSortBy" prepend-icon="mdi-sort-ascending" :items="sortBy" label="Ordenar Por">
          </v-select>
          <v-checkbox v-model="checkbox" label="Eventos Activos"></v-checkbox>
        </div>
        <div class="d-flex flex-row flex-wrap justify-space-around">
          <SkeletonCard v-if="loading" :amount="10"></SkeletonCard>
          <div v-else v-for="event in showEvents" :key="event.id" class="ma-5">
            <EventsCard :event="event" />
          </div>
        </div>
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="5" xl="4" class="justify-space-around">
        <CommunitiesDetails :communityId="parseInt(this.$route.query.id)" />
        <v-btn
          x-large
          class="ma-1 my-4 px-16"
          color="eventButton"
          block
          :to="'/events/modify?mode=C&community=' + parseInt(this.$route.query.id)">
          Crear evento
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script scoped>
export default {
  data: () => ({
    loading: true,
    selectedSortBy: 'Fecha Descendiente',
    sortBy: ['Fecha Descendiente', 'Fecha Ascendente'],
    events: [],
    showEvents: [],
    checkbox: false,
    community: {},
  }),
  watch: {
    selectedSortBy(newValue, oldValue) {
      this.fechaAscendente(newValue)
    },
    checkbox(newValue, oldValue) {
      this.activeEvents(newValue)
    },
  },
  mounted() {
    this.getCommunityEvents(parseInt(this.$route.query.id))
  },
  methods: {
    fechaAscendente(sort) {
      if (sort == 'Fecha Ascendente') {
        this.showEvents = this.showEvents.sort(function (a, b) {
          const date1 = new Date(a.date)
          const date2 = new Date(b.date)
          return date1 - date2
        })
      } else {
        this.showEvents = this.showEvents.sort(function (a, b) {
          const date1 = new Date(a.date)
          const date2 = new Date(b.date)
          return date2 - date1
        })
      }
    },
    activeEvents(x) {
      if (x == false) {
        this.showEvents.splice(this.events.length)
        console.log(this.events.length)
        this.showEvents = this.events
      } else {
        this.showEvents = this.events.filter((item) => item.state === 'Active' || item.state === 'Activo')
      }
    },
    getCommunityEvents(id) {
      this.$axios
        .get('communities/' + id + '/events')
        .then((data) => {
          this.events = data.data[0]['events']
          this.showEvents = this.events
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
