<template>
  <div>
    <h1 class="mt-5 mb-3 text-center text-h2">Comunidades</h1>
    <v-text-field label="Buscar" placeholder="Buscar" solo v-model="srch_str" @keyup="search()"></v-text-field>
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
import {runInThisContext} from 'vm'

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
    search() {
      if (this.srch_str.length > 0) {
        //this.loadingCommunities = true;
        this.$axios
          .get('communities/search/' + this.srch_str)
          .then((data) => {
            this.shown = data.data
            this.loadingCommunities = false
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        this.shown = this.communities
      }
    },
  },
}
</script>
