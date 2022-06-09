<template>
  <v-row>
    <v-col cols="12" sm="12" md="8">
      <v-card class="pa-6">
        <v-form>
          <v-row>
            <v-col cols="12" sm="12">
              <v-text-field filled label="Titulo" v-model="title" required></v-text-field>
            </v-col>
            <v-col cols="12" sm="12">
              <v-textarea v-model="description" filled name="input-7-4" rows="2" label="Descripcion">
              </v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-menu ref="datePiker" v-model="datePiker" :close-on-content-click="false" :return-value.sync="date"
                transition="scale-transition" offset-y min-width="auto">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field filled v-model="date" label="Fecha" prepend-icon="mdi-calendar" readonly v-bind="attrs"
                    v-on="on"></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable label="Fecha">
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="datePiker = false">
                    Cancel
                  </v-btn>
                  <v-btn text color="primary" @click="$refs.datePiker.save(date)">
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-menu ref="menu" v-model="timePiker" :close-on-content-click="false" :nudge-right="40"
                :return-value.sync="time" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field filled v-model="time" label="Hora" prepend-icon="mdi-clock-time-four-outline" readonly
                    v-bind="attrs" v-on="on"></v-text-field>
                </template>
                <v-time-picker v-if="timePiker" format="24hr" v-model="time" full-width label="Hora"
                  @click:minute="$refs.menu.save(time)">
                </v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-file-input filled accept="image/png, image/jpeg" show-size chips truncate-length=" 18"></v-file-input>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-select v-model="province" filled :items="provinces" item-text="nombre" menu-props="auto"
                label="Provincia" prepend-icon="mdi-map" single-line></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-select v-model="city" filled :items="cities" item-text="nombre" menu-props="auto" label="Ciudad"
                hide-details prepend-icon="mdi-city" single-line></v-select>
            </v-col>
            <v-col cols="12" sm="12" md="6">
              <v-text-field prepend-icon="mdi-map-marker" filled label="Direccion" v-model="adress" required>
              </v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="6" >
              <v-btn color="primary">Crear</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="4">
      <EventsVerticalCard :title="title" :date="date" :time="time" :place="place"
        :description="description" :community="community" :src="photo" />
    </v-col>

  </v-row>

</template>
<script>
import provincesCities from '/assets/data/provincesCities.json'
export default {
  data() {
    return {
      title: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
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
      datePiker: false
    }
  }, watch: {
    province() {
      this.city = 'Ciudad'
      this.place = this.province + ', ' + this.city + ', ' + this.adress
      this.cities = provincesCities.filter(prov => prov.nombre == this.province)
      this.cities = this.cities[0]["ciudades"]
    },
    city() {
      this.place = this.province + ', ' + this.city + ', ' + this.adress
    },
    adress() {
      this.place = this.province + ', ' + this.city + ', ' + this.adress
    }
  }
}
</script>