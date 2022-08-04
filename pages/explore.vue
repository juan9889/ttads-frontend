<template>
  <div>
    <h1 class="text-center mb-4">Comunidades</h1>
    <v-row justify="center">
      <v-col sm="3" xs="3" md="3" class="pt-3">
        <v-btn class="d-flex flex-column mb-2" v-for="category in categories" :key="category.id" elevation="6" raised>
          {{ category.name }}</v-btn>
      </v-col>
      <div v-for="community in communities" :key="community.id">
      <v-col sm="3" xs="3" md="3">
        <CommunitiesCard :name="community.name" :category="community.category" :description="community.description"
          :src="'https://cdn.vuetifyjs.com/images/cards/cooking.png'" />
      </v-col>
  </div>
  </v-row>
  </div>
</template>

<script>
export default {
  name: 'Explore',
  data: () => ({
    categories: [],
    communities: []
  }),
  mounted() {
    this.getCategories();
    this.getCommunities();
  },
  methods: {
    getCategories() {
      this.$axios.get("http://localhost:8080/api/commcategory")
        .then((data) => {
          this.categories = data.data
          console.log(data.data)
        }).catch((err) => {
          console.log(err)
        })
    },
    getCommunities() {
      this.$axios.get("http://localhost:8080/api/communities")
        .then((data) => {
          this.communities = data.data
          console.log(data.data)
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>