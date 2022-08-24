<template>
  <div>
    <h1 class="text-center text-h3 mb-4">Explorar</h1>
    <v-row justify="center">
      <v-col xs="12" sm="12" md="2" class="pt-3">
        <h3 class="text-h5 text-center">Categorias</h3>
        <SkeletonButton v-if="loadingCategories" :amount="6"></SkeletonButton>
        <v-btn-toggle
          v-else
          group
          v-model="categoryListIndex"
          tile
          color="primary"
          class="d-flex flex-column"
        >
          <v-btn
            class="mb-2"
            v-for="category in categories"
            :key="category.id"
            elevation="6"
            raised
          >
            {{ category.name }}
            <v-spacer></v-spacer>
            <v-icon right dark :color="category.iconColor">
              mdi-{{ category.icon }}
            </v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col xs="12" sm="12" md="10">
        <h3 class="mb-4 text-h4 text-center">Comunidades</h3>
        <v-row class="justify-space-around">
          <skeletonCard v-if="loadingCommunities" :amount="16"></skeletonCard>
          <div v-else v-for="community in communities" :key="community.id">
            <CommunitiesCard :community="community" />
          </div>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Explore',
  data: () => ({
    loadingCategories: true,
    loadingCommunities: true,
    categories: [],
    communities: [],
    categoryListIndex: undefined,
  }),
  mounted() {
    this.getCategories()
    this.getCommunities()
  },
  watch: {
    categoryListIndex(newIndex, oldIndex) {
      if (newIndex != undefined) {
        const idCategoria = this.categories[newIndex]['id']
        this.getCommunitiesFromCategory(idCategoria)
        if (newIndex == 0) {
          this.getCommunities()
        }
      }
    },
  },
  methods: {
    getCategories() {
      this.$axios
        .get('commcategory')
        .then((data) => {
          this.categories = data.data
          this.categories.unshift({
            id: 0,
            name: 'Todo',
            icon: 'checkbox-marked-circle-outline',
            createdAt: '',
            updatedAt: '',
          })
          this.loadingCategories = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
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
    getCommunitiesFromCategory(id) {
      this.$axios
        .get('commcategory/' + id + '/communities')
        .then((data) => {
          this.communities = data.data[0]['communities']
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
