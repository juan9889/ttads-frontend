<template>
  <v-row justify="center" align="left">
    <v-col>
      <h1>Panel admin</h1>
      <br />
      <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-list>
      <v-list-item-group v-model="model">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
          icon: 'mdi-inbox',
          text: 'Ciudades',
        },
        {
          icon: 'mdi-star',
          text: 'Provincias',
        },
        {
          icon: 'mdi-send',
          text: 'Categorias de eventos',
        },
      ],
      model: 1,
    }),
  }
</script>