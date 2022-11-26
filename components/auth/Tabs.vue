<template>
  <div>
    <v-tabs v-model="tab" show-arrows icons-and-text grow>
      <v-tab v-for="i in tabs" :key="i.id">
        <v-icon large>{{ i.icon }}</v-icon>
        <div class="caption py-1">{{ i.name }}</div>
      </v-tab>
      <v-tab-item>
        <AuthLogin></AuthLogin>
      </v-tab-item>
      <v-tab-item>
        <authCreateUser></authCreateUser>
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
export default {
  data: () => ({
    tab: 0,
    tabs: [
      {id: 1, name: 'Iniciar sesion', icon: 'mdi-account'},
      {id: 2, name: 'Crear cuenta', icon: 'mdi-account-outline'},
    ],
  }),
}
</script>
