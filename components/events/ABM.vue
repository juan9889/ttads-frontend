<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="12">
        <v-card class="pa-6">
          <h1 class="text-center mb-3">
            {{ mode == 'C' ? 'Crear' : mode == 'D' ? 'Eliminar' : 'Guardar' }}
            Evento
          </h1>
          <v-form ref="form" v-model="valid" @submit.prevent="validateForm" :disabled="mode == 'D' ? true : false">
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  :counter="cTitle"
                  :rules="requiredRule"
                  filled
                  label="Titulo"
                  v-model="title"
                  required
                  hint="For example, flowers or used cars">
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-textarea
                  :counter="cDescription"
                  :rules="requiredRule"
                  v-model="description"
                  filled
                  name="input-7-4"
                  rows="2"
                  label="Descripcion">
                </v-textarea>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-dialog ref="dialog" v-model="modal" :return-value.sync="date" persistent width="290px">
                  <template v-slot:activator="{on, attrs}">
                    <v-text-field
                      v-model="date"
                      label="Picker in dialog"
                      prepend-icon="mdi-calendar"
                      readonly
                      filled
                      v-bind="attrs"
                      v-on="on"></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)"> OK </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-menu
                  ref="menu"
                  v-model="timePiker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px">
                  <template v-slot:activator="{on, attrs}">
                    <v-text-field
                      filled
                      v-model="time"
                      label="Hora"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timePiker"
                    format="24hr"
                    v-model="time"
                    full-width
                    label="Hora"
                    @click:minute="$refs.menu.save(time)">
                  </v-time-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-select
                  v-model="province"
                  :rules="requiredRule"
                  required
                  :items="provinces"
                  label="Provincia"
                  filled
                  prepend-icon="mdi-map"
                  return-object
                  item-text="name"
                  single-line>
                </v-select>
              </v-col>

              <v-col cols="12" sm="12" md="6">
                <v-select
                  v-model="city"
                  :items="cities"
                  :rules="requiredRule"
                  required
                  return-object
                  filled
                  item-text="name"
                  label="Ciudad"
                  prepend-icon="mdi-city"
                  single-line>
                </v-select>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-text-field
                  :counter="cPlace"
                  :rules="requiredRule"
                  prepend-icon="mdi-map-marker"
                  filled
                  label="Direccion"
                  v-model="place"
                  required>
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-select
                  v-model="category"
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
                <v-checkbox v-model="state" :label="`Activo`"></v-checkbox>
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
  </div>
</template>
<script>
export default {
  data: () => ({
    title: '',
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
    modal: false,
    time: '00:00',
    description: '',
    community: '',
    category: null,
    province: null,
    city: null,
    place: '',
    state: 'Active',
    success: false,

    event: undefined,
    categories: [],
    provinces: [], //get provincias
    cities: [], //get ciudadades de esa provincia seleccinada
    timePiker: false,
    datePiker: false,
    //Validations
    valid: false,
    cTitle: 25,
    cDescription: 210,
    cPlace: 35,
    requiredRule: [(v) => !!v || 'This is required'],
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
    this.getProvinces()
    this.getCategories()
    if (this.eventId != undefined && (this.mode == 'U' || this.mode == 'D')) {
      this.getEvent(this.eventId)
    } else {
      this.getCommunity(this.communityId)
    }
  },
  methods: {
    validateForm() {
      if (
        this.title != '' &&
        this.place != '' &&
        this.description != '' &&
        this.date != '' &&
        this.time != '' &&
        this.city != null &&
        this.category != null
      ) {
        switch (this.mode) {
          case 'C':
            this.createEvent()
            this.$router.back()
            break
          case 'U':
            // this.UpdateEvent()
            this.$router.back()
            break
          case 'D':
            // this.DeleteEvent()
            this.$router.back()
            break
        }
      }
    },
    getProvinces() {
      this.$axios
        .get('provinces/')
        .then((data) => {
          this.provinces = data.data
          console.log(JSON.stringify(this.provinces))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProcinceCities(provinceId) {
      this.$axios
        .get('provinces/' + provinceId + '/cities')
        .then((data) => {
          this.cities = data.data[0]['cities']
          console.log(JSON.stringify(this.cities))
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getCommunity(id) {
      this.$axios
        .get('communities/' + id)
        .then((data) => {
          this.community = data.data[0]
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getEvent(id) {
      this.$axios
        .get('events/' + id)
        .then((data) => {
          this.event = data.data[0]
          this.title = this.event.title
          this.description = this.event.description
          this.date = this.event.date
          this.time = this.event.time
          this.province = this.event.city.province
          this.city = this.event.city
          this.community = this.event.community
          this.place = this.event.place
          this.category = this.event.event_category
          this.state = this.event.state
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
    createEvent() {
      this.$axios
        .post('/events', {
          title: this.title,
          place: this.place,
          description: this.description,
          date: this.date,
          state: this.state,
          time: this.time,
          cityId: this.city.id,
          categoryId: this.category.id,
          communityId: this.community.id,
        })
        .then((data) => {
          if (data.status == 201) {
            alert('Evento creado')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  watch: {
    province(newValue, oldValue) {
      console.log('provincia Id: ' + this.province)
      this.cities = []
      this.getProcinceCities(newValue.id)
    },
  },
}
</script>
