<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition" width="95%">
    <template v-id v-slot:activator="{on, attrs}">
      <v-btn x-large class="ma-1 my-4 px-16" block v-bind="attrs" v-on="on"> Cambiar Contraseña </v-btn>
    </template>
    <SkeletonAbm v-if="loading" :amount="1"></SkeletonAbm>
    <v-card v-else class="px-0">
      <v-toolbar dark
        ><v-btn icon dark right @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="text-centers text-h4"> Cambiar contraseña </v-toolbar-title>
      </v-toolbar>
      <v-form ref="registerForm" v-model="valid" @submit.prevent="createUser">
        <v-row class="ma-0 mt-4">
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
    dialog: false,
    loading: false,
    noti: {
      show: false,
      success: true,
      header: '',
      text: '',
    },
    password: '',
    verifyPassword: '',

    show1: false,
    requiredRule: (v) => !!v || 'Campo obligatorio.',
    passwordCounter: (value) => (value && value.length >= 3) || 'Minimo 3 caracteres',
    maxCounter: (value) => (value && value.length <= 60) || 'Maximo 3 caracteres',
  }),
  methods: {
    matchPassword(value) {
      return this.verifyPassword === this.password || 'Las contraseñas no coinciden.'
    },
    updatePassword() {},
    notification(success) {
      if (success == true) {
        this.$router.go()
      } else {
        this.noti.show = false
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
