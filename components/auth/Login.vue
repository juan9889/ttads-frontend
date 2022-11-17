<template>
<v-dialog v-model="dialog" persistent max-width="600px" min-width="360px">
    <div>
        <v-tabs v-model="tab" show-arrows background-color="info" icons-and-text dark grow>
            <v-tabs-slider color="blue darken-4"></v-tabs-slider>
            <v-tab v-for="i in tabs" :key="i">
                <v-icon large>{{ i.icon }}</v-icon>
                <div class="caption py-1">{{ i.name }}</div>
            </v-tab>
            <v-tab-item>
                <v-card class="px-4">
                    <v-card-text>
                        <v-form ref="loginForm" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="loginUsername" label="Usuario" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="loginPassword" :append-icon="show1?'eye':'eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Contraseña" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                </v-col>
                                <v-col class="d-flex" cols="12" sm="6" xsm="12">
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col class="d-flex" cols="12"  xsm="12" align-end>
                                    <v-btn  :disabled="!valid" color="success" @click="validate"> Iniciar sesion </v-btn>
                                    <v-spacer></v-spacer>
                                    <v-btn
      tile
      color="black"
      href="https://github.com/login/oauth/authorize?client_id=dad3030ba2058c6371bf"
    >
    <v-icon left >mdi-github</v-icon>
      Iniciar sesion con GitHub
    </v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item>
                <v-card class="px-4">
                    <v-card-text>
                        <v-form ref="registerForm" v-model="valid" lazy-validation>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="firstName" :rules="[rules.required]" label="Nombre completo" maxlength="35" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="lastName" :rules="[rules.required]" label="Nombre de usuario" maxlength="35" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.min]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Contraseña" hint="At least 8 characters" counter @click:append="show1 = !show1"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field block v-model="verify" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, passwordMatch]" :type="show1 ? 'text' : 'password'" name="input-10-1" label="Repetir contraseña" counter @click:append="show1 = !show1"></v-text-field>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col class="d-flex ml-auto" cols="12" sm="3" xsm="12">
                                    <v-btn  :disabled="!valid" color="success" @click="validate">Registrar</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </div>
</v-dialog>
</template>
<script>
  export default {
    
   
  computed: {
    passwordMatch() {
      return () => this.password === this.verify || "Password must match";
    }
  },
  methods: {
    validate() {
      if (this.$refs.loginForm.validate()) {
        // submit form to server/API here...
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },
  data: () => ({
    dialog: true,
    tab: 0,
    tabs: [
        {name:"Iniciar sesion", icon:"mdi-account"},
        {name:"Crear cuenta", icon:"mdi-account-outline"}
    ],
    valid: true,
    
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    verify: "",
    loginPassword: "",
    loginUsername: "",


    show1: false,
    rules: {
      required: value => !!value || "Obligatorio",
      min: v => (v && v.length >= 8) || "Minimo 8 caracteres"
    }
  })
};
  </script>
  