<template>
  <div>
    <h1>Provincias</h1>
    <br />
    <v-btn color="green" elevation="24" @click.stop="dialog_new = true">Agregar provincia</v-btn>
    <br />
    <br />
    <v-card>
      <v-card-title>
        Provincias
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Buscar" single-line hide-details></v-text-field>
      </v-card-title>
      <v-spacer></v-spacer>
      <v-data-table  :headers="headers" :items="provincias" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click.stop="open_delete_diag(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog_delete" max-width="290">
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
          <v-btn color="red" fill @click="delete_confirm">
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
                <v-text-field  v-model="nombre_nueva_provincia" label="Nombre" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog_new = false">
            Cancelar
          </v-btn>
          <v-btn color="green" filled @click="create">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <v-snackbar
      v-model="snackbar_nueva_ok"
      right top
      color="green"
    >
      Se ha creado la nueva provincia

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar_nueva_ok = false"
        >
          x
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="snackbar_delete_ok"
      right top
      color="green"
    >
      Se ha eliminado la provincia

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar_delete_ok = false"
        >
          x
        </v-btn>
      </template>
    </v-snackbar>


  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      search: '',
      item_borrar: '',
      nombre_nueva_provincia : '',
      snackbar_nueva_ok : false,
      snackbar_delete_ok : false,
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
      provincias: this.getProvinces(),
      selectedItem: {
        name: '',
        id: 0,
      },
      editedIndex: -1,
    }
  },
  methods: {
    getProvinces() {
      this.$axios.$get('http://localhost:8080/api/provinces')
        .then((res) => {
          this.provincias = res
          console.log(res)
        }
        )
        .catch((err) => console.log(err))
    },
    open_delete_diag(item) {
      
      this.selectedItem = Object.assign({}, item);
      console.log(this.selectedItem);
      this.dialog_delete=true;
    },
    async delete_confirm(){
await this.$axios.$delete('http://localhost:8080/api/provinces/'+this.selectedItem.id);
this.dialog_delete=false;
this.snackbar_delete_ok=true;
await this.getProvinces();
    },
    async create() {
      await this.$axios.$post('http://localhost:8080/api/provinces', {
  name: this.nombre_nueva_provincia
},);
      this.dialog_new=false;
      this.nombre_nueva_provincia='';
      await this.getProvinces();
      this.snackbar_nueva_ok=true;
    },
    update() {

    }

  },
  mounted() {
    this.getProvinces()
  }
}
</script>