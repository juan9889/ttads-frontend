<template>
  <div>
    <h1 class="text-center mb-4">Tus Eventos</h1>
    <v-row justify="center" align="center">
      <v-btn-toggle dense v-model="toggle_exclusive" mandatory>
        <v-btn> Todos </v-btn>
        <v-btn> opcion 1 </v-btn>
        <v-btn> opcion 2 </v-btn>
        <v-btn> opcion 3 </v-btn>
      </v-btn-toggle>
    </v-row>
      <v-row justify="center" align="center">
        <v-col v-for="item in items" :key="item.id" cols="12">
          <EventsCard :vertical="flase" class="d-none d-md-flex" :title="item.title" :date="item.date"
            :time="item.time" :place="item.place" :description="item.description" :community="item.community"
            :src="item.src" />
          <EventsCard :vertical="true" class="d-md-none" :title="item.title" :date="item.date"
            :time="item.time" :place="item.place" :description="item.description" :community="item.community"
            :src="item.src" />
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
        title: 'Top western road trips',
        date: '01/01/2000',
        time: '00:00',
        place: '1,000 miles of wonder',
        description:
          'His ubique laboramus ne. Expetenda assueverit sed ad. Id nec malis lucilius delicatissimi. Nec assum sonet suscipit ex, diam deterruisset ut usu, ad dicat fabellas aliquando eam.',
        community: 'Sports',
        src: require('../../assets/images/img10.jpg'),
      },
      {
        id: 2,
        title: 'Christmas tales to read',
        date: '01/01/2000',
        time: '00:00',
        place: '2,000 miles of wonder',
        description:
          'Sea ad habemus assueverit, omnes platonem convenire sit et, at integre pericula quo. Facete adolescens definitionem cu qui, in putant aliquid fierent ius.',
        community: 'Sports',
        src: require('../../assets/images/img10.jpg'),
      },
      {
        id: 3,
        title: '20 movies not to miss in 2020',
        date: '01/01/2000',
        time: '00:00',
        place: '3,000 miles of wonder',
        description:
          'Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.',
        community: 'Sports',
        src: require('../../assets/images/img10.jpg'),
      },
      {
        id: 4,
        title: '20 movies not to miss in 2020',
        date: '01/01/2000',
        time: '00:00',
        place: '3,000 miles of wonder',
        description:
          'Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.',
        community: 'Sports',
        src: require('../../assets/images/img10.jpg'),
      },
      {
        id: 5,
        title: '20 movies not to miss in 2020',
        date: '01/01/2000',
        time: '00:00',
        place: '3,000 miles of wonder',
        description:
          'Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.',
        community: 'Sports',
        src: require('../../assets/images/img10.jpg'),
      },
      {
        id: 6,
        title: '20 movies not to miss in 2020',
        date: '01/01/2000',
        time: '00:00',
        place: '3,000 miles of wonder',
        description:
          'Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.',
        community: 'Sports',
        src: require('../../assets/images/img10.jpg'),
      },
      {
        id: 7,
        title: '20 movies not to miss in 2020',
        date: '01/01/2000',
        time: '00:00',
        place: '3,000 miles of wonder',
        description:
          'Aliquam albucius mei ei, debitis torquatos et pro, eos natum scribentur no. Putant verear constituto te qui. Adolescens persequeris vim ei. Vel nullam reprimique te.',
        community: 'Sports',
        src: require('../../assets/images/img10.jpg'),
      },
    ],
  }),
}
</script>