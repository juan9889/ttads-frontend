<template>
  <div>
    <v-card class="px-4 mt-5">
      <v-form ref="loginForm" v-model="valid" @submit.prevent="login">
        <v-row>
          <v-col cols="12">
            <v-text-field filled v-model="loginUsername" label="Usuario" :rules="[rules.requiredRule]"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              filled
              v-model="loginPassword"
              :append-icon="show1 ? 'eye' : 'eye-off'"
              :rules="[rules.requiredRule]"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Contraseña"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"></v-text-field>
          </v-col>
          <v-col cols="12" align-end>
            <v-btn class="mb-4" :disabled="!valid" type="submit" height="56px" x-large block @submit.prevent="login">
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
    <FormsNotification
      :show="dialog.show"
      :success="dialog.success"
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
      success: true,
      header: '',
      text: '',
    },
    loginPassword: null,
    loginUsername: null,
    show1: false,
    rules: {
      requiredRule: (v) => !!v || 'Campo obligatorio.',
    },
  }),
  methods: {
    notification() {
      this.dialog.show = false
    },
    async login() {
      if (this.$refs.loginForm.validate()) {
        try {
          const response = await this.$auth.loginWith('local', {
            data: {
              username: this.loginUsername,
              password: this.loginPassword,
            },
          })
          if (response.status == 200) {
            this.$router.push('/')
          } else {
            throw response
          }
        } catch (e) {
          this.dialog.header = 'Error al iniciar sesion'
          this.dialog.text = 'Error' + e.response.status + ': ' + e.response.data.message
          this.dialog.success = false
          this.dialog.show = true
        }
      }
    },
  },
}
</script>
