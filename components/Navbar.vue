<template>
  <div>
    <v-navigation-drawer
      class="d-flex d-md-none"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      disable-resize-watcher
      app>
      <v-list>
        <v-list-item v-for="(item, i) in btnItems" :key="i" :to="item.to" router exact>
          <v-list-item-action v-if="item.icon">
            <v-icon left>{{ item.iconName }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer></v-spacer>
      <v-switch
        class="ml-5"
        v-model="$vuetify.theme.dark"
        inset
        hide-details
        :label="$vuetify.theme.dark == true ? 'Noche' : 'Dia'">
      </v-switch>
    </v-navigation-drawer>
    <!--Hide mobile - Show desktop -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <!--Show mobile - Hide desktop -->

      <v-app-bar-nav-icon class="d-flex d-md-none" @click.stop="drawer = !drawer" />
      <!--Solo logeados-->
      <!-- <UserMenu /> -->
      <div class="d-none d-md-flex" v-for="(item, i) in btnItems" :key="i">
        <v-btn plain text nuxt :to="item.to">
          <v-icon left v-if="item.icon">{{ item.iconName }}</v-icon
          >{{ item.title }}
        </v-btn>
      </div>
      <v-spacer />
      <UsersAvatar class="mx-5" />

      <v-switch
        class="d-none d-md-flex"
        v-model="$vuetify.theme.dark"
        inset
        hide-details
        :label="$vuetify.theme.dark == true ? 'Noche' : 'Dia'">
      </v-switch>
    </v-app-bar>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'DefaultLayout',
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data() {
    var btnItems_tmp=[
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
          to: '/communities/explore',
        },
        {
          icon: false,
          iconName: 'mdi-chart-bubble',
          title: 'Buscar',
          to: '/search',
        },
      ];
    if(this.$store.state.auth.user.admin==0){
      btnItems_tmp=[
        {
          icon: true,
          iconName: 'mdi-home',
          title: 'Inicio',
          to: '/',
        },
        {
          icon: false,
          iconName: 'mdi-chart-bubble',
          title: 'Explorar',
          to: '/communities/explore',
        },
        {
          icon: false,
          iconName: 'mdi-chart-bubble',
          title: 'Buscar',
          to: '/search',
        },
      ];
    }
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      btnItems: btnItems_tmp,
      miniVariant: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
