<template>
  <div>
    <h1 class="mt-5 mb-5">Eventos destacados</h1>
    <v-row justify="center">
      <div v-for="item in events" :key="item.id">
        <v-col xl="3" lg="4" md="6" sm="12" class="text-center">
          <EventsCard :vertical="true" :title="item.title" :date="item.date" :time="item.time" :place="item.place"
            :description="item.description" :community="item.community" :src="item.src" />
        </v-col>
      </div>
    </v-row>
    <v-divider class="mt-10 mb-5"></v-divider>
    <h1 class="mt-5 mb-5">Comunidades</h1>
    <v-row justify="center">
      <div v-for="community in communities" :key="community.id">
        <v-col xl="3" lg="4" md="6" sm="12" class="text-center">
          <CommunitiesCard :community="community" />
        </v-col>
      </div>
    </v-row>

  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    events: [
      {
        id: 1,
        title: "Top western road trips",
        date: "01/01/2000",
        time: "20:45",
        place: "1,000 miles of wonder",
        description: "His ubique laboramus ne. Expetenda assueverit sed ad. Id nec malis lucilius delicatissimi. Nec assum sonet suscipit ex, diam deterruisset ut usu, ad dicat fabellas aliquando eam.",
        community: "Sports",
        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        id: 2,
        title: "Christmas tales to read",
        date: "01/01/2000",
        time: "20:45",
        place: "2,000 miles of wonder",
        description: "Sea ad habemus assueverit, omnes platonem convenire sit et, at integre pericula quo. Facete adolescens definitionem cu qui, in putant aliquid fierent ius.",
        community: "Sports",
        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        id: 3,
        title: "20 movies not to miss in 2020",
        date: "01/01/2000",
        time: "20:45",
        place: "3,000 miles of wonder",
        description: "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
        community: "Sports",
        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        id: 4,
        title: "20 movies not to miss in 2020",
        date: "01/01/2000",
        time: "20:45",
        place: "3,000 miles of wonder",
        description: "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
        community: "Sports",
        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        id: 5,
        title: "20 movies not to miss in 2020",
        date: "01/01/2000",
        time: "20:45",
        place: "3,000 miles of wonder",
        description: "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
        community: "Sports",
        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },
      {
        id: 6,
        title: "20 movies not to miss in 2020",
        date: "01/01/2000",
        time: "20:45",
        place: "3,000 miles of wonder",
        description: "Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.",
        community: "Sports",
        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      },

    ],
    communities: [],
  }),
  mounted() {
    this.getCommunities();
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
    }
  }
}
</script>
