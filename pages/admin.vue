<template>
  <v-card
    height="400"
    width="256"
    class="mx-auto top-0 start-0"
  >
    <v-navigation-drawer permanent>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Panel de admin
          </v-list-item-title>
          <v-list-item-subtitle>
           
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>



<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Ciudades', icon: 'mdi-view-dashboard' },
          { title: 'Provincias', icon: 'mdi-image' },
          { title: 'Categorias de eventos', icon: 'mdi-help-box' },
        ],
        right: null,
      }
    },
  }
</script>