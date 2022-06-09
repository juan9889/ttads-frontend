<template>
<div>
  <h1>Ciudades</h1>
  <br />
<v-btn
  color="green"
  elevation="24"
>Agregar ciudad</v-btn>
<br></br>
  <v-card>
    <v-card-title>
      Ciudades
      <v-spacer></v-spacer>
     

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-spacer></v-spacer>
     
<v-spacer></v-spacer>
    <v-data-table
      :headers="headers"
      :items="ciudades"
      :search="search"
    ></v-data-table>
  </v-card>
  </div>
</template>

<script>
  export default {
    layout: 'adminLayout',
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Ciudad',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Provincia', value: 'provincia' },
          { text: 'ID', value: 'id' },
          
        ],
        ciudades: [
          {
            name: 'Rosario',
            provincia: 'Santa Fe',
            id : '1',
          },
          {
            name: 'Capitan Bermudez',
            provincia: 'Santa Fe',
            id : '2',
          },
          
        ],
      }
    },
  }
</script>