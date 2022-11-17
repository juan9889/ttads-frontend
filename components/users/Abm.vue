<template>
  <v-card class="pa-6">
    <h1 class="text-center mb-3">
      <!-- {{ mode == 'C' ? 'Crear' : mode == 'D' ? 'Eliminar' : 'Guardar' }} -->
      Perfil
    </h1>
    <v-form ref="form" v-model="valid" @submit.prevent="validateForm" :disabled="mode == 'D' ? true : false">
      <v-row>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            :counter="cUsername"
            :rules="requiredRule"
            prepend-icon="mdi-map-marker"
            filled
            label="Nombre de usuario"
            v-model="username"
            required>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            :counter="cName"
            :rules="requiredRule"
            prepend-icon="mdi-map-marker"
            filled
            label="Nombre"
            v-model="name"
            required>
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="4">
          <v-text-field
            :counter="cMail"
            :rules="mailRule"
            prepend-icon="mdi-map-marker"
            filled
            label="Mail"
            v-model="mail"
            required>
          </v-text-field>
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
        <v-col cols="12" sm="12" md="12">
          <v-btn
            :disabled="!valid"
            type="submit"
            height="56px"
            x-large
            block
            :color="mode == 'D' ? 'warning' : 'primary'">
            {{ mode == 'C' ? 'Editar' : mode == 'D' ? 'Eliminar' : 'Guardar' }}
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    username: null,
    name: null,
    mail: null,
    province: null,
    city: null,
    success: false,

    provinces: [], //get provincias
    cities: [], //get ciudadades de esa provincia seleccinada

    valid: false,
    requiredRule: [(v) => !!v || 'Campo obligatorio.'],
    mailRule: [(v) => !!v || 'Campo obligatorio.'],
    cUsername: 30,
    cName: 30,
    cMail: 50,
  }),
  props: {
    mode: {
      type: String,
      default: 'C',
    }, // 'C' 'U' 'D'
    userId: Number,
  },
  mounted() {
    this.getProvinces()
    if (this.userId != undefined && (this.mode == 'U' || this.mode == 'D')) {
      this.getUser(this.userId)
    }
  },
  methods: {
    validateForm() {
      if (this.username != '' && this.name != '' && this.mail != '' && this.city != null) {
        switch (this.mode) {
          case 'C':
            this.createUser()
            this.$router.back()
            break
          case 'U':
            // this.updateUser()
            this.$router.back()
            break
          case 'D':
            // this.deleteUser()
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
    getUser(userID) {},
    createUser() {},
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
