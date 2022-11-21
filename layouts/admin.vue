<template>
  <v-app>
    <Navbar />
    <v-main>
      <div>
        <v-navigation-drawer permanent expand-on-hover absolute clipped>
          <v-list>
            <v-list-item class="px-2">
              <v-list-item-avatar> </v-list-item-avatar>
            </v-list-item>
            <v-list-item link>
              <v-list-item-content>
                <v-list-item-title class="text-h6"> Panel de administrador </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-divider />
          <v-list nav dense>
            <v-list-item link to="/admin/abm_ciudades">
              <v-list-item-icon>
                <v-icon>mdi-folder</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Ciudades</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/admin/abm_provincias">
              <v-list-item-icon>
                <v-icon>mdi-account-multiple</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Provincias</v-list-item-title>
            </v-list-item>
            <v-list-item link to="/admin/abm_categorias_eventos">
              <v-list-item-icon>
                <v-icon>mdi-star</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Categorias de eventos</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </div>
      <div class="ml-14">
        <v-container>
          <Nuxt />
        </v-container>
      </div>
    </v-main>
    <Footer />
  </v-app>
</template>
<script>
export default {
  middleware: 'auth',
}
</script>
