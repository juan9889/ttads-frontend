<template>
  <div>
    <h1>Ciudades</h1>
    <br />
    <v-btn color="green" elevation="24" @click.stop="dialog_new = true"
      >Agregar ciudad</v-btn
    >
    <br />
    <br />
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
      <v-data-table :headers="headers" :items="ciudades" :search="search">
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="open_edit_diag(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click.stop="open_delete_diag(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data> </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="dialog_delete" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Eliminar ciudad </v-card-title>
        <v-card-text> ¿Eliminar la ciudad seleccionada? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog_delete = false">
            Cancelar
          </v-btn>
          <v-btn color="red" fill @click="delete_confirm"> Eliminar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_edit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar ciudad</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="nuevo_nombre_edit_ciudad"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="this.provincias"
                  v-model="selected_province"
                  label="Provincia"
                  item-text="name"
                  item-value="id"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog_edit = false">
            Cancelar
          </v-btn>
          <v-btn color="green" filled @click="edit_confirm"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_new" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Nueva ciudad</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="nombre_nueva_ciudad"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="this.provincias"
                  v-model="selected_province"
                  label="Provincia"
                  item-text="name"
                  item-value="id"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog_new = false">
            Cancelar
          </v-btn>
          <v-btn color="green" filled @click="create"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar_success" right top color="green">
      {{ this.snackbar_text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar_success = false"
        >
          x
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar v-model="snackbar_error" right top color="red">
      {{ this.snackbar_text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbar_error = false"
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
      ciudades_req: [],
      dialog_new: false,
      dialog_edit: false,
      dialog_delete: false,
      setDialogConfirm: false, //true confirmado
      snackbar_error: false,
      snackbar_success: false,
      snackbar_text: '',
      item_borrar: '',
      selectedItem: {
        name: '',
        provinceId: '',
        id: 0,
      },
      editedIndex: -1,

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
      ciudades: [],
      provincias: [],
      nombre_nueva_ciudad: '',
      nuevo_nombre_edit_ciudad: '',
      selected_province: '',
    }
  },
  methods: {
    async getCiudades() {
      this.ciudades = []
      this.ciudades_req = await this.$axios.$get('cities')
      console.log(this.ciudades_req)
      this.ciudades_req.forEach((ciudad) => {
        ciudad.provincia = this.getNombreProvinciaConID(ciudad.provinceId)
        this.ciudades.push(ciudad)
      })
    },
    async getProvincias() {
      this.provincias = await this.$axios.$get('provinces')
      console.log(this.provincias)
    },
    getNombreProvinciaConID(id) {
      var nombre = ''
      this.provincias.forEach((provincia) => {
        if (provincia.id == id) {
          nombre = provincia.name
        }
      })
      return nombre
    },
    async create() {
      try {
        await this.$axios.$post('cities', {
          name: this.nombre_nueva_ciudad,
          provinceId: this.selected_province,
        })
        this.dialog_new = false
        this.snackbar_text = 'Ciudad creada exitosamente'
        this.snackbar_success = true
        await this.getCiudades()
      } catch (e) {
        console.log(e)
        this.snackbar_text = 'Ocurrió un error al crear la ciudad'
        this.snackbar_error = true
      }
    },
    open_delete_diag(item) {
      this.selectedItem = Object.assign({}, item)
      console.log(this.selectedItem)
      this.dialog_delete = true
    },
    open_edit_diag(item) {
      this.selectedItem = Object.assign({}, item)
      console.log(this.selectedItem)
      this.nuevo_nombre_edit_ciudad = this.selectedItem.name
      this.selected_province = this.selectedItem.provinceId
      this.dialog_edit = true
    },
    async delete_confirm() {
      try {
        await this.$axios.$delete('cities/' + this.selectedItem.id)
        this.dialog_delete = false
        this.snackbar_success = false
        this.snackbar_text = 'Se eliminó la ciudad correctamente'
        this.snackbar_success = true
        await this.getCiudades()
      } catch (e) {
        this.snackbar_text = 'Ocurrió un error al eliminar la ciudad'
        this.snackbar_error = true
        console.log(e)
      }
    },
    async edit_confirm() {
      try {
        await this.$axios.$put('cities/' + this.selectedItem.id, {
          name: this.nuevo_nombre_edit_ciudad,
          provinceId: this.selected_province,
        })
        this.nuevo_nombre_edit_ciudad = ''
        this.dialog_edit = false
        this.snackbar_success = false
        this.snackbar_text = 'Se modificó la ciudad'
        this.snackbar_success = true
        await this.getCiudades()
      } catch (e) {
        this.snackbar_text = 'Ocurrió un error al modificar la ciudad'
        this.snackbar_error = true
      }
    },
  },

  async mounted() {
    await this.getProvincias()
    await this.getCiudades()
  },
}
</script>
