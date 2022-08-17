<template>
  <div>
    <v-skeleton-loader v-if="loading" type="card-avatar, article, actions">
    </v-skeleton-loader>
    <v-card v-else class="mx-2 mb-3" mx-width="350">
      <v-icon :color="community.comm_category.iconColor" class="icons pt-6 d-flex justify-center" x-large>
        mdi-{{ community.comm_category.icon }}
      </v-icon>
      <v-card-title class="text-h3 justify-center">{{ community.name.toUpperCase() }}</v-card-title>
      <v-card-subtitle class="pb-1 text-h4 text-center">#{{ community.comm_category.name }}</v-card-subtitle>
      <v-card-text class=" text-h5 text-center">{{ community.description }}</v-card-text>
      <v-divider class="mx-4"></v-divider>
      <v-card-title class="text-h5 justify-center">Categoria de Eventos</v-card-title>
      <!-- <v-card-text>
        <v-chip-group v-for="event in eventCategoriesFilter(communityEvents)" v-model="selection"
          active-class="accent-4 white--text" column>
          <v-chip>{{ event.event_category.name }}</v-chip>
        </v-chip-group>
      </v-card-text> -->
      <v-card-actions class="pa-1 pt-0 justify-space-around">
        <v-btn class="ma-1" color="blue-grey lighten-1" outlined>Unirse</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style scoped>
.icons {
  font-size: 150px !important;
}
</style>

<script>
export default {
  data: () => ({
    community: {},
    selection: 1,
    loading: true,
  }),
  props: {
    communityId: Number,
  },
  mounted() {
    this.getCommunity(parseInt(this.$route.query.id))
  },
  methods: {
    eventCategoriesFilter(arr) {
      //Hacer filtro para quitar categorias repetidas de arr (communityEvents)
      console.log(JSON.stringify(arr))
      return arr
    },
    getCommunity(id) {
      this.$axios.get("http://localhost:8080/api/communities/" + id)
        .then((data) => {
          this.community = data.data[0]
          this.loading = false
        }).catch((err) => {
          console.log(err)
        })
    },
  }
}
</script>