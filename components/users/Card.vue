<template>
  <v-card class="user mx-auto pa-4 text-center">
    <v-card-title class="pb-1 text-h4">{{ name }}</v-card-title>
    <v-card-title class="pt-0 pb-5 text-h6 text-left">{{ username }} - {{ mail }} </v-card-title>
    <v-card-subtitle class="pb-1 pt-0 text-left"> {{ city.name }} - {{ city.province.name }} </v-card-subtitle>
  </v-card>
</template>
<style scoped>
.user {
  border: 1px solid rgb(0, 121, 107, 0.1) !important;
}
</style>
<script>
export default {
  data: () => ({
    username: '',
    password: '',
    name: '',
    mail: '',
    city: {
      province: {},
    },
  }),
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        const user = await this.$axios.get('/users/me')
        this.username = user.data.data.username
        this.name = user.data.data.name
        this.mail = user.data.data.mail
        this.city = user.data.data.city
        console.log(JSON.stringify(user.data.data))
      } catch (e) {
        console.log(e.message)
      }
    },
  },
}
</script>
