   <template>
  <div>
    <!--Show mobile - Hide desktop -->
    <v-navigation-drawer class="d-flex d-sm-none" v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed
      disable-resize-watcher app>
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
    </v-navigation-drawer>
    <!--Hide mobile - Show desktop -->
    <v-app-bar :clipped-left="clipped" fixed app>
      <!--Show mobile - Hide desktop -->
      <v-app-bar-nav-icon class="d-flex d-sm-none" @click.stop="drawer = !drawer" />
      <!--Solo logeados-->
      <div class="d-none d-sm-flex" v-for="(item,i) in btnItems" :key="i">
        <v-btn plain text nuxt :to="item.to">
          <v-icon left v-if="item.icon">{{item.iconName}}</v-icon>{{item.title}}
        </v-btn>
      </div>

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
          icon:true,
          iconName: 'mdi-home',
          title: 'Inicio',
          to: '/',
        },      
        {
          icon:false,
          iconName: 'mdi-apps',
          title: 'Mis Comunidades',
          to: '/communities',
        },
        {
          icon:false,
          iconName: 'mdi-chart-bubble',
          title: 'Mis Eventos',
          to: '/events',
        },
        {
          icon:false,
          iconName: 'mdi-chart-bubble',
          title: 'Administrador',
          to: '/admin',
        },
        ],
      miniVariant: false,
      title: 'Vuetify.js',
    }
  },
}
</script>