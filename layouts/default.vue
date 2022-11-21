<template>
  <v-app dark>
    <Navbar />
    <v-main>
      <!-- <LeftSidebar/> -->
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
}
</script>
