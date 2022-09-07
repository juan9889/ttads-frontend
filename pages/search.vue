<template>
  <div>
    <h1 class="mt-5 mb-3 text-center text-h2">Comunidades</h1>
    <v-text-field label="Buscar" placeholder="Buscar" solo v-model="srch_str"></v-text-field>
    <v-btn color="green" elevation="24" @click.stop="filter()">Buscar</v-btn>
    <v-divider class="mt-10 mb-5"></v-divider>
    <v-row class="justify-space-around">
      <SkeletonCard v-if="loadingCommunities" :amount="6"></SkeletonCard>
      <div v-else v-for="community in shown" :key="community.id">
        <CommunitiesCard :community="community" />
      </div>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    srch_str: '',
    communities: [],
    shown: [],
    loadingCommunities: true,
  }),
  mounted() {
    this.getCommunities()
  },
  methods: {
    getCommunities() {
      this.$axios
        .get('communities')
        .then((data) => {
          this.communities = data.data
          this.shown = this.communities
          this.loadingCommunities = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    filter() {
      if (this.srch_str.length < 1) {
        this.shown = this.communities
      } else {
        this.shown = []
        this.communities.forEach((com) => {
          console.log(com)
          if (
            com.name.toLowerCase().includes(this.srch_str.toLowerCase()) ||
            com.description.toLowerCase().includes(this.srch_str.toLowerCase())
          ) {
            this.shown.push(com)
          }
        })
      }
    },
  },
}
</script>
