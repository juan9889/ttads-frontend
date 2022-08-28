<template>
  <div>
    <h1>Categorias de eventos</h1>
    <br />
    <v-btn color="green" elevation="24" @click.stop="dialog_new = true"
      >Agregar categoría</v-btn
    >
    <br />
    <br />
    <v-card>
      <v-card-title>
        Categorias de eventos
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
      <v-data-table :headers="headers" :items="categorias" :search="search">
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
        <v-card-title class="text-h5"> Eliminar categoría </v-card-title>
        <v-card-text> ¿Eliminar la categoría seleccionada? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="default" text @click="dialog_delete = false">
            Cancelar
          </v-btn>
          <v-btn color="red" fill @click="delete_confirm"> Eliminar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_new" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Nueva categoría de eventos</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="nombre_nueva_categoria"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="icono_nueva_categoria"
                  :items="md_icons"
                  label="Icono"
                ></v-autocomplete>
              </v-col>

              <v-col cols="12" justify="space-around">
                <v-color-picker
                  dot-size="24"
                  hide-canvas
                  hide-inputs
                  hide-mode-switch
                  hide-sliders
                  show-swatches
                  swatches-max-height="150"
                  width="550"
                  v-model="color_seleccionado"
                ></v-color-picker>
              </v-col>

              <v-col cols="5"></v-col>
              <v-col cols="2">
                <v-icon x-large center dark :color="this.color_seleccionado">
                  {{ 'mdi-' + this.icono_nueva_categoria }}</v-icon
                >
              </v-col>
              <v-col cols="5"></v-col>
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
    <v-dialog v-model="dialog_edit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar categoría</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="nuevo_nombre_edit_categoria"
                  label="Nombre"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="icono_edit_categoria"
                  :items="md_icons"
                  label="Icono"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-color-picker
                  dot-size="24"
                  hide-canvas
                  hide-inputs
                  hide-mode-switch
                  hide-sliders
                  show-swatches
                  swatches-max-height="150"
                  width="550"
                  v-model="color_seleccionado"
                ></v-color-picker>
              </v-col>
              <v-col cols="5"></v-col>
              <v-col cols="2">
                <v-icon x-large center dark :color="this.color_seleccionado">
                  {{ 'mdi-' + this.icono_edit_categoria }}</v-icon
                >
              </v-col>
              <v-col cols="5"></v-col>
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
import { MISCELLANEOUS_TYPES } from '@babel/types'

export default {
  layout: 'admin',
  data() {
    return {
      search: '',
      item_borrar: '',
      snackbar_text: '',
      nombre_nueva_categoria: '',
      icono_nueva_categoria: '',
      icono_edit_categoria: '',
      nuevo_nombre_edit_categoria: '',
      color_seleccionado: '',
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
        { text: 'ID', value: 'id' },
        { text: 'Acciones', value: 'actions', sortable: false },
      ],
      md_icons: [],
      categorias: this.getEventCategories(),
      selectedItem: {
        name: '',
        id: 0,
      },
      editedIndex: -1,
    }
  },
  methods: {
    getEventCategories() {
      this.$axios
        .$get('eventcategory')
        .then((res) => {
          this.categorias = res
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
      this.nuevo_nombre_edit_categoria = this.selectedItem.name
      this.icono_edit_categoria = this.selectedItem.icon
      this.color_seleccionado = this.selectedItem.iconColor
      this.dialog_edit = true
    },
    async delete_confirm() {
      try {
        await this.$axios.$delete('eventcategory/' + this.selectedItem.id)
        this.dialog_delete = false
        this.snackbar_success = false
        this.snackbar_text = 'Se eliminó la categoría de evento correctamente'
        this.snackbar_success = true
        await this.getEventCategories()
      } catch (e) {
        this.snackbar_text =
          'Ocurrió un error al eliminar la categoría de evento'
        this.snackbar_error = true
      }
    },
    async edit_confirm() {
      try {
        await this.$axios.$put('eventcategory/' + this.selectedItem.id, {
          name: this.nuevo_nombre_edit_categoria,
          icon: this.icono_edit_categoria,
          iconColor: this.color_seleccionado,
        })
        this.nuevo_nombre_edit_categoria = ''
        this.dialog_edit = false
        this.snackbar_success = false
        this.snackbar_text = 'Se modificó la categoria'
        this.snackbar_success = true
        await this.getEventCategories()
      } catch (e) {
        this.snackbar_text = 'Ocurrió un error al modificar la categoria'
        this.snackbar_error = true
      }
    },
    async create() {
      try {
        console.log(this.color_seleccionado)
        await this.$axios.$post('eventcategory', {
          name: this.nombre_nueva_categoria,
          icon: this.icono_nueva_categoria,
          iconColor: this.color_seleccionado,
        })
        this.dialog_new = false
        this.nombre_nueva_provincia = ''
        await this.getEventCategories()
        this.snackbar_success = false
        this.snackbar_text = 'Provincia creada correctamente'
        this.snackbar_success = true
      } catch (e) {
        this.snackbar_text = 'Ocurrió un error al intentar crear la provincia'
        this.snackbar_error = true
      }
    },
    getMaterialIcons() {
      const misc = require('/static/misc.js')
      this.md_icons = misc.getAllMaterialIconsList()
    },
  },
  mounted() {
    this.getEventCategories()
    this.getMaterialIcons()
  },
}
</script>
