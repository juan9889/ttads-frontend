<template>
<div>
  <h1>Ciudades</h1>
  <br />
<v-btn
  color="green"
  elevation="24"
  @click.stop="dialog_new = true"
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
    >
        <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click.stop="dialog_delete = true"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
    </v-data-table>
    
  </v-card>
  <v-dialog
      v-model="dialog_delete"
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Borrar ciudad
        </v-card-title>

        <v-card-text>
          Borrar la ciudad seleccionada?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="default"
            text
            @click="dialog_delete = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="red"
            fill
            @click="dialog_delete = false"
          >
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialog_new"
      persistent
      max-width="600px"
    >
    <v-card>
        <v-card-title>
          <span class="text-h5">Nueva ciudad</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              
              <v-col cols="12">
                <v-text-field
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="['Santa Fe', 'La pampa', 'Corrientes']"
                  label="Provincia"
                  required
                ></v-select>
              </v-col>
              
            </v-row>
          </v-container>
         
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="default"
            text
            @click="dialog_new = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="green"
            filled
            @click="dialog_new = false"
          >
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  
</template>

<script>
  export default {
    layout: 'adminLayout',
    data () {
      return {
        search: '',
        dialog_new: false,
        dialog_edit: false,
        dialog_delete: false,   
        headers: [
          {
            text: 'Ciudad',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Provincia', value: 'provincia' },
          { text: 'ID', value: 'id' },
           { text: 'Acciones', value: 'actions', sortable: false },
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