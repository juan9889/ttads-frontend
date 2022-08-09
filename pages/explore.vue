<template>
  <div>
    <h1 class="text-center mb-4">Explorar</h1>
    <v-row justify="center">
      <v-col xs="12" sm="12" md="2" class="pt-3">
        <h3>Categorias</h3>
        <v-btn-toggle group v-model="categoryListIndex" tile color="primary" class="d-flex flex-column">
          <v-btn class="mb-2" v-for="category in categories" :key="category.id" elevation="6" raised>
            {{ category.name }}</v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col xs="12" sm="12" md="10">
        <h3>Comunidades</h3>
        <v-row>
          <v-col v-for="community in communities" :key="community.id">
            <CommunitiesCard :community="community" :name="community.name" :category="community.comm_category.name"
              :description="community.description" :src="'https://cdn.vuetifyjs.com/images/cards/cooking.png'" />
          </v-col>
        </v-row>

      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Explore',
  data: () => ({
    categories: [],
    communities: [],
    categoryListIndex: undefined
  }),
  mounted() {
    this.getCategories();
    this.getCommunities();
  },
  watch: {
    categoryListIndex(newIndex, oldIndex) {
      if (newIndex != undefined) {
        const idCategoria = this.categories[newIndex]['id']
        console.log("idCategoria: "+idCategoria)
        console.log("Watch 1 categoria: " + JSON.stringify(this.communities))
        this.getCommunitiesFromCategory(idCategoria)
      }
    },
  },
  methods: {
    getCategories() {
      this.$axios.get("http://localhost:8080/api/commcategory")
        .then((data) => {
          this.categories = data.data
        }).catch((err) => {
          console.log(err)
        })
    },
    getCommunities() {
      this.$axios.get("http://localhost:8080/api/communities")
        .then((data) => {
          this.communities = data.data
          console.log(data.data)
          console.log(JSON.stringify(this.communities))

        }).catch((err) => {
          console.log(err)
        })
    },
    getCommunitiesFromCategory(id) {
      this.$axios.get("http://localhost:8080/api/commcategory/" + id + "/communities")
        .then((data) => {
          // this.communities = data.data[0]['communities']
          console.log("get comu from categorias: " + JSON.stringify(data.data[0]['communities']))
          this.communities = data.data[0]['communities']
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>