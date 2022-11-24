<template>
  <div class="d-flex flex-row flex-wrap align-center">
    <div v-for="n in amount" :key="n">
      <v-card width="100%">
        <v-skeleton-loader
          class="mx-5 my-5 text-center"
          type="heading, date-picker-options, list-item,list-item,list-item,list-item,list-item,actions">
        </v-skeleton-loader>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    amount: Number,
  },
  data: () => ({}),
}
</script>
