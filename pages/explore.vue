<template>
  <div>
    <h1 class="text-center mb-4">Explorar</h1>
    <v-row justify="center">
      <v-col sm="2" class="pt-3">
        <h3>Categorias</h3>
        <v-btn-toggle group mandatory v-model="categoryListIndex" tile color="primary" class="d-flex flex-column">
          <v-btn class="mb-2" v-for="category in categories" :key="category.id" elevation="6" raised>
            {{ category.name }}</v-btn>
        </v-btn-toggle>
        {{ categoryListIndex }}
      </v-col>
      <v-col sm="10">
        <h3>Comunidades</h3>
        <v-row>
          <v-col v-for="community in communities" :key="community.id">
            <CommunitiesCard :name="community.name" :category="community.comm_category.name"
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
    console.log("mounted 1 " +JSON.stringify(this.communities))

    this.getCommunities();
    console.log("mounted 2 "+JSON.stringify(this.communities))

  },
  watch: {
    categoryListIndex(newIndex, oldIndex) {
      const idCategoria = this.categories[newIndex]['id']
      console.log("idCategoria: "+idCategoria)
      console.log(JSON.stringify(this.communities))
      // this.getCommunitiesFromCategory(idCategoria)
      this.communities = this.communities.filter(function(com) {
        return com['categoryId'] == idCategoria
      })//https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      //https://es.vuejs.org/v2/guide/list.html#v-for-con-un-Componente
      
      console.log(this.categories[newIndex]['name'])
      console.log(JSON.stringify(this.communities))

     
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
          console.log(JSON.stringify(this.communities))

        }).catch((err) => {
          console.log(err)
        })
    },
    getCommunitiesFromCategory(id) {
      this.$axios.get("http://localhost:8080/api/commcategory/" + id + "/communities")
        .then((data) => {
          this.communities = data.data[0]['communities']
          console.log(JSON.stringify(data.data))
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>