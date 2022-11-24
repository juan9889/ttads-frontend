<template>
  <div class="d-flex flex-row flex-wrap align-center">
    <div v-for="n in amount" :key="n">
      <v-skeleton-loader width="250px" class="mx-5 my-5 text-center" type="date-picker-options"> </v-skeleton-loader>
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
