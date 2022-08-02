<template>
  <div>
    <h1>Provincias</h1>
    <br />
    <v-btn color="green" elevation="24" @click.stop="dialog_new = true">Agregar provincia</v-btn>
    <br />
     <button @click="$fetch">Refresh</button>
    <br />
    <v-card>
      <v-card-title>
        Provincias
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-data-table :headers="headers" :items="provincias" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click.stop="dialog_delete = true">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog_delete"  max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          Eliminar provincia
        </v-card-title>
        <v-card-text>
          ¿Eliminar la provincia seleccionada?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog_delete = false">
            Cancelar
          </v-btn>
          <v-btn color="red" fill @click="dialog_delete = false">
            Eliminar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_new" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Nueva provincia</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Nombre" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog_new = false">
            Cancelar
          </v-btn>
          <v-btn color="green" filled @click="dialog_new = false">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      search: '',
      dialog_new: false,
      dialog_edit: false,
      dialog_delete: false,
      setDialogConfirm: false,//true confirmado
      
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        { text: 'ID', value: 'id' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      provincias: [],
    }
  },
   
  async fetch() {
    this.provincias = await this.$axios.$get('http://localhost:8080/api/provinces');
  },
}
</script>