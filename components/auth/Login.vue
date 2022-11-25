<template>
  <div>
    <v-tabs v-model="tab" show-arrows icons-and-text grow>
      <v-tab v-for="i in tabs" :key="i.id">
        <v-icon large>{{ i.icon }}</v-icon>
        <div class="caption py-1">{{ i.name }}</div>
      </v-tab>
      <v-tab-item>
        <v-card class="px-4 mt-5">
          <v-form ref="loginForm" v-model="valid" @submit.prevent="login">
            <v-row>
              <v-col cols="12">
                <v-text-field filled v-model="loginUsername" label="Usuario" :rules="rules.requiredRule"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  filled
                  v-model="loginPassword"
                  :append-icon="show1 ? 'eye' : 'eye-off'"
                  :rules="(rules.requiredRule, rules.password)"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"></v-text-field>
              </v-col>
              <v-col cols="12" align-end>
                <v-btn
                  class="mb-4"
                  :disabled="!valid"
                  type="submit"
                  height="56px"
                  x-large
                  block
                  @submit.prevent="login">
                  Iniciar sesion
                </v-btn>
                <v-btn
                  class="mb-4"
                  type="submit"
                  height="56px"
                  x-large
                  block
                  color="black"
                  href="https://github.com/login/oauth/authorize?client_id=dad3030ba2058c6371bf">
                  <v-icon left>mdi-github</v-icon>
                  Iniciar sesion con GitHub
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="px-4 mt-5">
          <v-form ref="registerForm" @submit.prevent="createUser">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  filled
                  v-model="user.username"
                  :rules="rules.requiredRule"
                  label="Nombre completo"
                  maxlength="35"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  filled
                  v-model="user.name"
                  :rules="rules.requiredRule"
                  label="Nombre de usuario"
                  maxlength="35"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  filled
                  v-model="user.mail"
                  :rules="(rules.requiredRule, rules.email)"
                  label="E-mail"
                  required></v-text-field>
              </v-col>
              <v-col cols="12">
                <FormsCities :mode="'C'" @updateCity="updateCity"></FormsCities>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  filled
                  v-model="user.password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="(rules.requiredRule, rules.password)"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Contraseña"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  filled
                  v-model="verify"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="(rules.requiredRule, rules.password, passwordMatch)"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  label="Repetir contraseña"
                  counter
                  @click:append="show1 = !show1"></v-text-field>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="12">
                <v-btn
                  class="mb-4"
                  :disabled="newCity == null ? true : false"
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
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
export default {
  data: () => ({
    tab: 0,
    tabs: [
      {id: 1, name: 'Iniciar sesion', icon: 'mdi-account'},
      {id: 2, name: 'Crear cuenta', icon: 'mdi-account-outline'},
    ],
    valid: true,
    newCity: null,

    user: {
      username: '',
      password: '',
      name: '',
      mail: '',
      city: {
        province: {},
      },
    },
    loginPassword: null,
    loginUsername: null,

    verify: '',
    show1: false,
    rules: {
      email: [
        (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'e-mail invalido.'
        },
      ],
      requiredRule: [(v) => !!v || 'Campo obligatorio.'],
      password: [(value) => (value && value.length >= 3) || 'Minimo 3 caracteres'], //minimo de la contraseña esta en 3 porque la constraseña de jorgito es 1234
      counter: [(value) => (value && value.length >= 3) || 'Minimo 3 caracteres'], //minimo para los otros campos se puede hacer con :counter="30" en cada field
    },
  }),
  computed: {
    passwordMatch(value) {
      // hayq ue arreglar esto
      // return value == this.verify || 'Password must match'
    },
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    updateCity(city) {
      this.newCity = city
    },
    async createUser() {
      if (this.$refs.registerForm.validate() && this.newCity != null) {
        try {
          this.user.city = this.newCity
          const response = await this.$axios.post('/users', {
            username: this.user.username,
            password: this.user.password,
            name: this.user.name,
            mail: this.user.mail,
            cityId: this.user.city.id,
          })
          if (response.status == 201) {
            //dialog
            this.$router.push('/auth/login')
          }
        } catch (e) {
          this.error = e.response.data.message
        }
      }
    },
    async login() {
      if (this.$refs.loginForm.validate()) {
        try {
          await this.$auth.loginWith('local', {
            data: {
              username: this.loginUsername,
              password: this.loginPassword,
            },
          })
          this.$router.push('/')
        } catch (e) {
          this.error = e.response.data.message
        }
      }
    },
  },
}
</script>
