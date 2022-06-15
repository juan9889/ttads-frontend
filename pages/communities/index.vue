<template>
  <div>
    <h1 class="text-center mb-4">Comunidades</h1>
    <v-row justify="center" align="center">
      <v-col v-for="item in items" :key="item.id" cols="12" sm="6" xs="6" md="12">
        <CommunitiesCard :vertical="flase" class="d-none d-md-flex" :category="item.category"
          :description="item.description" :community="item.community" :src="item.src" />
        <CommunitiesCard :vertical="true" class="d-md-none" :category="item.category" :description="item.description"
          :community="item.community" :src="item.src" />
      </v-col>
    </v-row>
  </div>


</template>
<script>
export default {
  data: () => ({
    items: [
      {
        id: 1,
        category: '1,000 miles of wonder',
        description:
          'His ubique laboramus ne. Expetenda assueverit sed ad. Id nec malis lucilius delicatissimi. Nec assum sonet suscipit ex, diam deterruisset ut usu, ad dicat fabellas aliquando eam.',
        community: 'Sports',
        src: require('../../assets/images/img10.jpg'),
      },
      {
        id: 2,
        category: '2,000 miles of wonder',
        description:
          'Sea ad habemus assueverit, omnes platonem convenire sit et, at integre pericula quo. Facete adolescens definitionem cu qui, in putant aliquid fierent ius.',
        community: 'Sports',
        src: require('../../assets/images/img10.jpg'),
      },
      {
        id: 3,
        category: '3,000 miles of wonder',
        description:
          'Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.',
        community: 'Sports',
        src: require('../../assets/images/img10.jpg'),
      }
    ],
  }),
}
</script>