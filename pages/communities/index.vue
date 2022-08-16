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
        <v-row>
          <div v-for="event in showEvents" :key="event.id">
            <v-col class="justify-space-around text-center" xs="12" sm="12" md="6" lg="7" xl="8">
              <EventsCard :event="event" />
            </v-col>
          </div>
        </v-row>
      </v-col>
      <v-col xs="12" sm="12" md="6" lg="5" xl="4" class="justify-space-around">
        <template v-if="loading">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </template>
        <CommunitiesDetails v-else :community="community" :communityEvents="events" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    selectedSortBy: 'Fecha Descendiente',
    sortBy: ['Fecha Descendiente', 'Fecha Ascendente' ],
    events: [],
    showEvents: [],
    checkbox: false,
    community: {},
  }),
  watch: {
    selectedSortBy(newValue,oldValue) {
      this.fechaAscendente(newValue);
    },
    checkbox(newValue, oldValue) {
      this.activeEvents(newValue)
    }
  },
  mounted() {
    this.getCommunity(parseInt(this.$route.query.id));
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
    }
    ,
    getCommunity(id) {
      this.loading = true
      this.$axios.get("http://localhost:8080/api/communities/" + id)
        .then((data) => {
          this.community = data.data[0]
          this.loading = false
        }).catch((err) => {
          console.log(err)
        })
    },
    getCommunityEvents(id) {
      this.$axios.get("http://localhost:8080/api/communities/" + id + "/events")
        .then((data) => {
          this.events = data.data[0]['events']
          this.showEvents = this.events
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>