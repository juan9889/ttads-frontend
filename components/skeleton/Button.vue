<template>
  <div class="d-flex flex-wrap align-center">
    <div v-for="n in amount" :key="n">
      <v-skeleton-loader class="mx-5 my-5 text-center" type="button"> </v-skeleton-loader>
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
