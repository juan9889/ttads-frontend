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
      <v-data-table :headers="headers" :items="provincias" :search="search">
        <template v-slot:item.actions="{item}">
          <v-icon small class="mr-2" @click="open_edit_diag(item)"> mdi-pencil </v-icon>
          <v-icon small @click.stop="open_delete_diag(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data> </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog_delete" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Eliminar provincia </v-card-title>
        <v-card-text> ¿Eliminar la provincia seleccionada? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog_delete = false"> Cancelar </v-btn>
          <v-btn color="red" fill @click="delete_confirm"> Eliminar </v-btn>
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
                <v-text-field v-model="nombre_nueva_provincia" label="Nombre" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog_new = false"> Cancelar </v-btn>
          <v-btn color="green" filled @click="create"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_edit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar provincia</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="nuevo_nombre_edit_provincia" label="Nombre" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog_edit = false"> Cancelar </v-btn>
          <v-btn color="green" filled @click="edit_confirm"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar_success" right top color="green">
      {{ this.snackbar_text }}

      <template v-slot:action="{attrs}">
        <v-btn color="white" text v-bind="attrs" @click="snackbar_success = false"> x </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar_error" right top color="red">
      {{ this.snackbar_text }}

      <template v-slot:action="{attrs}">
        <v-btn color="white" text v-bind="attrs" @click="snackbar_error = false"> x </v-btn>
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
      snackbar_text: '',
      nombre_nueva_provincia: '',
      nuevo_nombre_edit_provincia: '',
      snackbar_error: false,
      snackbar_success: false,
      dialog_new: false,
      dialog_edit: false,
      dialog_delete: false,
      setDialogConfirm: false, //true confirmado

      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: true,
          value: 'name',
        },
        {text: 'ID', value: 'id'},
        {text: 'Acciones', value: 'actions', sortable: false},
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
      this.$axios
        .$get('provinces')
        .then((res) => {
          this.provincias = res
          console.log(res)
        })
        .catch((err) => console.log(err))
    },
    open_delete_diag(item) {
      this.selectedItem = Object.assign({}, item)
      console.log(this.selectedItem)
      this.dialog_delete = true
    },
    open_edit_diag(item) {
      this.selectedItem = Object.assign({}, item)
      console.log(this.selectedItem)
      this.nuevo_nombre_edit_provincia = this.selectedItem.name
      this.dialog_edit = true
    },
    async delete_confirm() {
      try {
        await this.$axios.$delete('provinces/' + this.selectedItem.id)
        this.dialog_delete = false
        this.snackbar_success = false
        this.snackbar_text = 'Se eliminó la pronvincia correctamente'
        this.snackbar_success = true
        await this.getProvinces()
      } catch (e) {
        this.snackbar_text = 'Ocurrió un error al eliminar la provincia'
        this.snackbar_error = true
      }
    },
    async edit_confirm() {
      try {
        await this.$axios.$put('provinces/' + this.selectedItem.id, {
          name: this.nuevo_nombre_edit_provincia,
        })
        this.nuevo_nombre_edit_provincia = ''
        this.dialog_edit = false
        this.snackbar_success = false
        this.snackbar_text = 'Se modificó la pronvincia'
        this.snackbar_success = true
        await this.getProvinces()
      } catch (e) {
        this.snackbar_text = 'Ocurrió un error al modificar la provincia'
        this.snackbar_error = true
      }
    },
    async create() {
      try {
        await this.$axios.$post('provinces', {
          name: this.nombre_nueva_provincia,
        })
        this.dialog_new = false
        this.nombre_nueva_provincia = ''
        await this.getProvinces()
        this.snackbar_success = false
        this.snackbar_text = 'Provincia creada correctamente'
        this.snackbar_success = true
      } catch (e) {
        this.snackbar_text = 'Ocurrió un error al intentar crear la provincia'
        this.snackbar_error = true
      }
    },
  },
  mounted() {
    this.getProvinces()
  },
}
</script>
