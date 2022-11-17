<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <UsersAbm :userId="userId"></UsersAbm>
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <!-- comunidades -->
      </v-col>
      <v-col cols="12" sm="12" md="12">
        <!-- eventos -->
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    success: false,
  }),
  props: {
    userId: Number,
  },
  mounted() {},
  methods: {},
  watch: {},
}
</script>
