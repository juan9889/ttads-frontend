<template>
  <div>
    <v-app-bar app clipped-right flat height="50" color="tertiary">
      <!--Solo logeados-->
      <div class="d-none d-md-flex" v-for="(item, i) in btnItems" :key="i">
        <v-btn plain text nuxt :to="item.to">
          <v-icon left v-if="item.icon">{{ item.iconName }}</v-icon>{{ item.title }}
        </v-btn>
      </div>
      <v-spacer></v-spacer>
      <v-responsive max-width="300">
        <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
      </v-responsive>
      <v-spacer />
      <v-btn plain text nuxt to="/">Salir
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      btnItems: [
        {
          icon: true,
          iconName: 'mdi-home',
          title: 'Inicio',
          to: '/',
        },
        {
          icon: false,
          iconName: 'mdi-chart-bubble',
          title: 'Administrador',
          to: '/admin',
        },
        {
          icon: false,
          iconName: 'mdi-chart-bubble',
          title: 'Explorar',
          to: '/explore',
        }
      ],
      miniVariant: false,
      title: 'Vuetify.js',
    }
  },
}
</script>