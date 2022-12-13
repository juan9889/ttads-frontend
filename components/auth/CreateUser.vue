<template>
  <div>
    <v-card class="px-4 mt-5">
      <v-form ref="registerForm" v-model="valid" @submit.prevent="createUser">
        <v-row>
          <v-col cols="12">
            <v-text-field
              filled
              v-model="name"
              :rules="[minCounter, maxCounter, requiredRule]"
              label="Nombre completo"
              maxlength="35"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              filled
              v-model="username"
              :rules="[minCounter, maxCounter, requiredRule]"
              label="Nombre de usuario"
              maxlength="35"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              filled
              v-model="mail"
              :rules="[minCounter, maxCounter, requiredRule, email]"
              label="E-mail"></v-text-field>
          </v-col>
          <v-col cols="12">
            <FormsCities :mode="'C'" @updateCity="updateCity"></FormsCities>
          </v-col>
          <v-col cols="12">
            <v-text-field
              filled
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[requiredRule, passwordCounter]"
              :type="show1 ? 'text' : 'password'"
              label="Contraseña"
              hint="At least 8 characters"
              @click:append="show1 = !show1"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              filled
              v-model="verifyPassword"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[requiredRule, passwordCounter, matchPassword]"
              :type="show1 ? 'text' : 'password'"
              label="Repetir contraseña"
              @click:append="show1 = !show1"></v-text-field>
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
              @submit.prevent="createUser"
              >Registrar</v-btn
            >
          </v-col>
        </v-row>
      </v-form>
    </v-card>
    <FormsNotification
      :show="dialog.show"
      :notiType="dialog.notiType"
      :header="dialog.header"
      :text="dialog.text"
      @notification="notification"></FormsNotification>
  </div>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    newCity: null,
    dialog: {
      show: false,
      notiType: true,
      header: '',
      text: '',
    },
    username: '',
    password: '',
    name: '',
    mail: '',

    verifyPassword: '',
    show1: false,
    email: (value) => {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || 'e-mail invalido.'
    },
    requiredRule: (v) => !!v || 'Campo obligatorio.',
    passwordCounter: (value) => (value && value.length >= 3) || 'Minimo 3 caracteres',
    minCounter: (value) => (value && value.length >= 3) || 'Minimo 3 caracteres',
    maxCounter: (value) => (value && value.length <= 60) || 'Maximo 3 caracteres',
  }),
  methods: {
    matchPassword(value) {
      return this.verifyPassword === this.password || 'Las contraseñas no coinciden.'
    },
    updateCity(city) {
      this.newCity = city
    },
    notification(success) {
      if (success == true) {
        this.$router.go()
      } else {
        this.$router.go()
      }
    },
    async createUser() {
      if (this.$refs.registerForm.validate() && this.newCity != null) {
        try {
          const response = await this.$axios.post('/users', {
            username: this.username,
            password: this.password,
            name: this.name,
            mail: this.mail,
            cityId: this.newCity.id,
          })
          if (response.status == 201) {
            this.dialog.header = 'Usuario registrado'
            this.dialog.text = 'Gracias'
            this.dialog.notiType = true
            this.dialog.show = true
          } else {
            throw response
          }
        } catch (e) {
          this.dialog.header = 'Error al registrar el usuario'
          this.dialog.text = 'Error' + e.response.status + ': ' + e.response.data.message
          this.dialog.notiType = false
          this.dialog.show = true
        }
      }
    },
  },
  watch: {
    password() {
      this.verifyPassword = ''
    },
  },
}
</script>
