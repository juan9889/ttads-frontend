<template>
  <div>
    <SkeletonAbm v-if="loading" :amount="1"></SkeletonAbm>
    <v-card v-else class="pa-6">
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
          <FormsCities
            :mode="mode"
            :provinceProp="event.city.province"
            :cityProp="event.city"
            @updateCity="updateCity"></FormsCities>
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
  </div>
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

    loading: true,
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
    if (this.userId != undefined && (this.mode == 'U' || this.mode == 'D')) {
      this.getUser(this.userId)
    }
  },
  methods: {
    updateCity(city) {
      this.newCity = city
      console.log('EVENT CITY: ' + JSON.stringify(this.newCity))
    },
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
    getUser(userID) {
      this.loading = true
    },
    createUser() {},
  },
  watch: {},
}
</script>
