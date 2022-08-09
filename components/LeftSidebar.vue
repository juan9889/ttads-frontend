<template>
  <div>
    <v-navigation-drawer app fixed dark color="tertiary" floating mini-variant height="100%">
      
      <v-divider class="mx-3 my-5"></v-divider>
      <v-avatar v-for="n in 9" :key="n" class="d-block text-center mx-auto mb-9" color="grey" rounded size="28">
      </v-avatar>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
</style>