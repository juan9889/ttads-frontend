<template>
  <div>
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-select
          v-model="province"
          :rules="requiredRule"
          :disabled="mode == 'D' ? true : false"
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
          :disabled="mode == 'D' ? true : false"
          return-object
          filled
          item-text="name"
          label="Ciudad"
          prepend-icon="mdi-city"
          single-line>
        </v-select>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data: () => ({
    province: null,
    city: null,
    provinces: [], //get provincias
    cities: [], //get ciudadades de esa provincia seleccinada
    loading: true,
    requiredRule: [(v) => !!v || 'Campo obligatorio.'],
  }),
  props: {
    mode: {
      type: String,
      default: 'C',
    }, // 'C' 'U' 'D'
    provinceProp: Object,
    cityProp: Object,
  },
  mounted() {
    if ((this.provinceProp != undefined || this.cityProp != undefined) && (this.mode == 'U' || this.mode == 'D')) {
      this.loading = false
      this.province = this.provinceProp
      this.city = this.cityProp
      this.getProvinces()
    } else {
      this.getProvinces()
    }
  },
  methods: {
    getProvinces() {
      this.$axios
        .get('provinces/')
        .then((data) => {
          this.provinces = data.data
          this.loading = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProcinceCities(provinceId) {
      this.$axios
        .get('provinces/' + provinceId + '/cities')
        .then((data) => {
          this.cities = data.data['cities']
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  watch: {
    province(newValue) {
      this.cities = []
      if (this.mode == 'C') {
        this.city = null
      }
      this.getProcinceCities(newValue.id)
    },
    city(newValue) {
      this.$emit('updateCity', this.city)
      console.log('PROVINCE CITY: ' + JSON.stringify(this.city))
    },
    provinceProp() {
      this.province = this.provinceProp
    },
    cityProp() {
      this.city = this.cityProp
    },
  },
}
</script>
