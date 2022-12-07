<template>
  <v-dialog v-model="dialog" hide-overlay fullscreen transition="dialog-bottom-transition" width="95%">
    <template v-id v-slot:activator="{on, attrs}">
      <v-btn x-large class="ma-1 my-4 px-16" block v-bind="attrs" v-on="on"> Cambiar informacion </v-btn>
    </template>
    <SkeletonAbm v-if="loading" :amount="1"></SkeletonAbm>
    <v-card v-else class="px-0">
      <v-toolbar dark
        ><v-btn icon dark right @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="text-centers text-h4"> Cambiar informacion </v-toolbar-title>
      </v-toolbar>
      <v-form ref="registerForm" v-model="valid" @submit.prevent="createUser">
        <v-row class="ma-0">
          <v-col cols="12">
            <v-text-field
              filled
              v-model="name"
              :rules="[minCounter, maxCounter, requiredRule]"
              label="Nombre completo"
              maxlength="35"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field filled disabled v-model="username" label="Nombre de usuario"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              filled
              v-model="mail"
              :rules="[minCounter, maxCounter, requiredRule, email]"
              label="E-mail"></v-text-field>
          </v-col>
          <v-col cols="12">
            <FormsCities
              :mode="'U'"
              :provinceProp="city.province"
              :cityProp="city"
              @updateCity="updateCity"></FormsCities>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12">
            <v-btn
              class="mb-4"
              :disabled="!valid"
              type="submit"
              height="56px"
              x-large
              block
              @submit.prevent="createUser">
              Guardar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <FormsNotification
      :show="noti.show"
      :success="noti.success"
      :header="noti.header"
      :text="noti.text"
      @notification="notification"></FormsNotification>
  </v-dialog>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    newCity: null,
    loading: false,
    dialog: false,
    noti: {
      show: false,
      success: true,
      header: '',
      text: '',
    },
    username: '',
    name: '',
    mail: '',
    city: {
      province: '',
    },
    show1: false,
    email: (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'e-mail invalido.'
    },
    requiredRule: (v) => !!v || 'Campo obligatorio.',
    minCounter: (value) => (value && value.length >= 3) || 'Minimo 3 caracteres',
    maxCounter: (value) => (value && value.length <= 60) || 'Maximo 3 caracteres',
  }),
  mounted() {
    this.getUser()
  },
  methods: {
    async getUser() {
      try {
        const user = await this.$axios.get('/users/me')
        this.username = user.data.data.username
        this.name = user.data.data.name
        this.mail = user.data.data.mail
        this.city = user.data.data.city
      } catch (e) {
        console.log(e.message)
      }
    },
    async updateUser() {
      try {
        const user = await this.$axios.post('/users//update', {
          username: this.username,
          name: this.name,
          mail: this.mail,
          cityId: this.newCity.id,
        })
      } catch (e) {
        console.log(e.message)
      }
    },
    updateCity(city) {
      this.newCity = city
    },
    notification(success) {
      if (success == true) {
        this.$router.go()
      } else {
        this.noti.show = false
      }
    },
  },
}
</script>
