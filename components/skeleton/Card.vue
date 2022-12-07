<template>
  <div class="d-flex flex-row flex-wrap align-center">
    <div v-for="n in amount" :key="n">
      <div v-if="amount == 0">
        <h3>Ups. Nada para mostar</h3>
      </div>
      <v-skeleton-loader
        v-else
        width="250px"
        class="mx-5 my-5 text-center"
        type="card-heading, list-item-three-line, actions">
      </v-skeleton-loader>
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
