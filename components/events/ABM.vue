<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card class="pa-6">
          <h1 class="text-center mb-3">
            {{ mode == 'C' ? 'Crear' : mode == 'D' ? 'Eliminar' : 'Guardar' }}
            Evento
          </h1>
          <v-form ref="form" lazy-validation v-model="valid">
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field
                  :counter="cTitle"
                  :rules="rTitle"
                  filled
                  label="Titulo"
                  v-model="title"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-textarea
                  :counter="cDescription"
                  :rules="rDescription"
                  v-model="description"
                  filled
                  name="input-7-4"
                  rows="2"
                  label="Descripcion"
                >
                </v-textarea>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-menu
                  ref="datePiker"
                  v-model="datePiker"
                  :close-on-content-click="false"
                  :return-value.sync="date"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      filled
                      v-model="date"
                      label="Fecha"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    scrollable
                    label="Fecha"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="datePiker = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.datePiker.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
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
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      filled
                      v-model="time"
                      label="Hora"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timePiker"
                    format="24hr"
                    v-model="time"
                    full-width
                    label="Hora"
                    @click:minute="$refs.menu.save(time)"
                  >
                  </v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-file-input
                  :rules="rPhoto"
                  filled
                  accept="image/png, image/jpeg"
                  show-size
                  chips
                  truncate-length=" 18"
                >
                </v-file-input>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-select
                  :rules="rProvince"
                  v-model="province"
                  filled
                  :items="provinces"
                  item-text="nombre"
                  menu-props="auto"
                  label="Provincia"
                  prepend-icon="mdi-map"
                  single-line
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-select
                  :rules="rCity"
                  v-model="city"
                  filled
                  :items="cities"
                  item-text="nombre"
                  menu-props="auto"
                  label="Ciudad"
                  hide-details
                  prepend-icon="mdi-city"
                  single-line
                ></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-text-field
                  :counter="cAdress"
                  :rules="rAdress"
                  prepend-icon="mdi-map-marker"
                  filled
                  label="Direccion"
                  v-model="adress"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="6">
                <v-btn
                  :disabled="!valid"
                  @click="validate"
                  height="56px"
                  x-large
                  block
                  :color="mode == 'D' ? 'red' : 'primary'"
                  >{{
                    mode == 'C' ? 'Crear' : mode == 'D' ? 'Eliminar' : 'Guardar'
                  }}</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-card class="pb-4">
          <h1 class="text-center mb-3">Vista previa</h1>
          <EventsCard
            :vertical="true"
            :title="title"
            :date="date"
            :time="time"
            :place="place"
            :description="description"
            :community="community"
            :src="photo"
        /></v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import provincesCities from '/assets/data/provincesCities.json'
export default {
  props: {
    mode: String, // 'C' 'U' 'D'
  },
  data() {
    return {
      title: '',
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      time: '00:00',
      description: '',
      community: 'Comunidad',
      photo: '',
      province: 'Provincia',
      city: 'Ciudad',
      adress: '',
      place: '',

      provinces: provincesCities,
      cities: [],
      timePiker: false,
      datePiker: false,
      //Validations
      valid: false,
      //Rules
      cTitle: 25,
      cDescription: 210,
      cAdress: 35,
      rTitle: [
        (value) =>
          (value || '').length <= this.cTitle ||
          `Maximo de ${this.cTitle} caracteres.`,
        (value) => !!value || 'Requerido.',
      ],
      rDescription: [
        (value) =>
          (value || '').length <= this.cDescription ||
          `Maximo de ${this.cDescription} caracteres.`,
        (value) => !!value || 'Requerido.',
      ],
      rPhoto: [(value) => !!value || 'Requerido.'],
      rProvince: [(value) => !!value || 'Requerido.'],
      rCity: [(value) => !!value || 'Requerido.'],
      rAdress: [
        (value) =>
          (value || '').length <= this.cAdress ||
          `Maximo de ${this.cAdress} caracteres.`,
        (value) => !!value || 'Requerido.',
      ],
    }
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        switch (this.mode) {
          case 'C':
            break
          case 'U':
            break
          case 'D':
            break
        }
      }
    },
  },
  watch: {
    province() {
      this.city = ''
      this.place = this.province + ', ' + this.city + ', ' + this.adress
      this.cities = provincesCities.filter(
        (prov) => prov.nombre == this.province
      )
      this.cities = this.cities[0]['ciudades']
    },
    city() {
      this.place = this.province + ', ' + this.city + ', ' + this.adress
    },
    adress() {
      this.place = this.province + ', ' + this.city + ', ' + this.adress
    },
  },
}
</script>
