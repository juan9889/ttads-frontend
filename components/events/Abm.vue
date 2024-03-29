<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" width="90%">
    <template v-id v-slot:activator="{on, attrs}">
      <v-btn
        large
        class="px-4 ma-1"
        :color="mode == 'C' ? 'eventButton' : mode == 'D' ? 'warning' : 'eventButton'"
        block
        v-bind="attrs"
        v-on="on"
        >{{ mode == 'C' ? 'Crear' : mode == 'D' ? 'Eliminar' : 'Editar' }} Evento
      </v-btn>
    </template>
    <SkeletonAbm v-if="loading" :amount="1"></SkeletonAbm>
    <v-card v-else>
      <v-toolbar dark
        ><v-btn icon dark right @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="text-centers text-h4">
          {{ mode == 'C' ? 'Crear' : mode == 'D' ? 'Eliminar' : 'Guardar' }}
          Evento
        </v-toolbar-title>
      </v-toolbar>
      <v-row class="ma-0">
        <v-col cols="12" sm="12" md="12">
          <v-card class="pa-6">
            <v-form ref="form" v-model="valid" @submit.prevent="validateForm" :disabled="mode == 'D' ? true : false">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    :counter="cTitle"
                    :rules="requiredRule"
                    filled
                    label="Titulo"
                    v-model="event.title"
                    required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-textarea
                    :counter="cDescription"
                    :rules="requiredRule"
                    v-model="event.description"
                    filled
                    name="input-7-4"
                    rows="2"
                    label="Descripcion">
                  </v-textarea>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-dialog ref="dialog" v-model="modal" :return-value.sync="event.date" persistent width="290px">
                    <template v-slot:activator="{on, attrs}">
                      <v-text-field
                        v-model="event.date"
                        label="Picker in dialog"
                        prepend-icon="mdi-calendar"
                        readonly
                        filled
                        v-bind="attrs"
                        v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="event.date" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(event.date)"> OK </v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-col>
                <v-col cols="12" sm="12" md="6">
                  <v-menu
                    ref="menu"
                    v-model="timePiker"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="event.time"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{on, attrs}">
                      <v-text-field
                        filled
                        v-model="event.time"
                        label="Hora"
                        prepend-icon="mdi-clock-time-four-outline"
                        readonly
                        v-bind="attrs"
                        v-on="on"></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="timePiker"
                      format="24hr"
                      v-model="event.time"
                      full-width
                      label="Hora"
                      @click:minute="$refs.menu.save(event.time)">
                    </v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <FormsCities
                    :mode="mode"
                    :provinceProp="event.city.province"
                    :cityProp="event.city"
                    @updateCity="updateCity"></FormsCities
                ></v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-text-field
                    :counter="cPlace"
                    :rules="requiredRule"
                    prepend-icon="mdi-map-marker"
                    filled
                    label="Direccion"
                    v-model="event.place"
                    required>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-select
                    v-model="event.event_category"
                    :items="categories"
                    :rules="requiredRule"
                    required
                    return-object
                    filled
                    item-text="name"
                    label="Categoria"
                    menu-props="auto"
                    prepend-icon="mdi-star-circle-outline"
                    single-line>
                  </v-select>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-select
                    v-model="event.state"
                    :items="states"
                    :rules="requiredRule"
                    required
                    return-object
                    filled
                    item-text="name"
                    label="Estado"
                    menu-props="auto"
                    prepend-icon="mdi-star-circle-outline"
                    single-line>
                  </v-select>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-btn
                    :disabled="!valid"
                    type="submit"
                    height="56px"
                    x-large
                    block
                    :color="mode == 'D' ? 'warning' : 'primary'">
                    {{ mode == 'C' ? 'Crear' : mode == 'D' ? 'Eliminar' : 'Guardar' }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
    <FormsNotification
      :show="noti.show"
      :notiType="noti.notiType"
      :header="noti.header"
      :text="noti.text"
      @notification="notification"></FormsNotification>
  </v-dialog>
</template>
<Style scoped>
</Style>
<script>
export default {
  data: () => ({
    modal: false,
    notiType: false,
    newCity: {id: null},
    event: {
      title: '',
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
      time: '00:00',
      description: '',
      city: {
        id: null,
        province: {id: null},
      },
      place: '',
      state: null,
      community: {},
      event_category: {id: null},
    },
    states: ['Activo', 'Cancelado', 'Terminado'],
    categories: [],
    timePiker: false,
    datePiker: false,
    dialog: false,
    loading: true,
    //Validations

    noti: {
      show: false,
      notiType: true,
      header: '',
      text: '',
    },
    valid: false,
    cTitle: 25,
    cDescription: 210,
    cPlace: 35,
    requiredRule: [(v) => !!v || 'Campo obligatorio.'],
  }),
  props: {
    mode: {
      type: String,
      default: 'C',
    }, // 'C' 'U' 'D'
    communityId: Number,
    eventId: Number,
  },
  mounted() {
    this.getCategories()
    if (this.eventId != undefined && (this.mode == 'U' || this.mode == 'D')) {
      this.getEvent(this.eventId)
    } else {
      this.getCommunity(this.communityId)
    }
  },
  methods: {
    updateCity(city) {
      this.newCity = city
      console.log('EVENT CITY: ' + JSON.stringify(this.newCity))
    },
    notification(success) {
      if (success == true) {
        this.noti.show = false
        this.$router.go()
      } else {
        this.noti.show = false
        this.$router.go()
      }
    },
    async validateForm() {
      if (
        this.event.title != '' &&
        this.event.place != '' &&
        this.event.description != '' &&
        this.event.date != '' &&
        this.event.time != '' &&
        this.newCity.id != null &&
        this.event.event_category.id != null &&
        this.event.state != null
      ) {
        console.log('pasa validacion')
        switch (this.mode) {
          case 'C':
            await this.createEvent()
            break
          case 'U':
            await this.updateEvent()
            break
          case 'D':
            await this.deleteEvent()
            break
        }
      }
    },
    async createEvent() {
      switch (this.event.state) {
        case 'Activo':
          this.event.state = 1
          break
        case 'Cancelado':
          this.event.state = 0
          break
        case 'Terminado':
          this.event.state = 2
          break
      }
      try {
        const response = await this.$axios.post('/events', {
          title: this.event.title,
          place: this.event.place,
          description: this.event.description,
          date: this.event.date,
          state: this.event.state,
          time: this.event.time,
          cityId: this.newCity.id,
          categoryId: this.event.event_category.id,
          communityId: this.communityId,
        })
        if (response.status == 201) {
          this.dialog = false
          this.noti.header = 'Evento registrado'
          this.noti.text = 'Gracias'
          this.noti.notiType = true
          this.noti.show = true
        } else {
          throw response
        }
      } catch (e) {
        this.noti.header = 'Error al registrar el evento'
        this.noti.text = 'Error' + e.response.status + ': ' + e.response.data.message
        this.noti.notiType = false
        this.noti.show = true
      }
    },
    async updateEvent() {
      switch (this.event.state) {
        case 'Activo':
          this.event.state = 1
          break
        case 'Cancelado':
          this.event.state = 0
          break
        case 'Terminado':
          this.event.state = 2
          break
      }
      try {
        const response = await this.$axios.put('/events/' + this.event.id, {
          title: this.event.title,
          place: this.event.place,
          description: this.event.description,
          date: this.event.date,
          state: this.event.state,
          time: this.event.time,
          cityId: this.newCity.id,
          categoryId: this.event.event_category.id,
        })
        if (response.status == 200) {
          this.dialog = false
          this.noti.header = 'Evento guardado'
          this.noti.text = 'Gracias'
          this.noti.notiType = true
          this.noti.show = true
        } else {
          throw response
        }
      } catch (e) {
        this.noti.header = 'Error al guardar el evento'
        this.noti.text = 'Error' + e.response.status + ': ' + e.response.data.message
        this.noti.notiType = false
        this.noti.show = true
      }
    },
    async deleteEvent() {
      console.log('llega a create event')
      try {
        const response = await this.$axios.delete('/events/' + this.event.id)
        if (response.status == 200) {
          this.dialog = false
          this.noti.header = 'Evento eliminado'
          this.noti.text = 'Gracias'
          this.noti.notiType = true
          this.noti.show = true
        } else {
          throw response
        }
      } catch (e) {
        this.noti.header = 'Error al eliminar el evento'
        this.noti.text = 'Error' + e.response.status + ': ' + e.response.data.message
        this.noti.notiType = false
        this.noti.show = true
      }
    },
    getCommunity(id) {
      this.$axios
        .get('communities/' + id)
        .then((data) => {
          this.community = data.data
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getEvent(id) {
      this.$axios
        .get('events/' + id)
        .then((data) => {
          this.event = data.data
          switch (this.event.state) {
            case 1:
              this.event.state = 'Activo'
              break
            case 0:
              this.event.state = 'Cancelado'
              break
            case 2:
              this.event.state = 'Terminado'
              break
          }
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCategories() {
      this.$axios
        .get('/eventcategory')
        .then((data) => {
          this.categories = data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
}
</script>
