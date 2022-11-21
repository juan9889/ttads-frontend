<template>
  <div>
    <br />
    <br />
    <br />
    <br />
    <v-container class="fill-height">
      <v-row justify="center">
        <v-col>
          <v-container style="height: 400px">
            <v-row class="fill-height" align-content="center" justify="center">
              <v-col class="text-subtitle-1 text-center" cols="12"> Iniciando sesion... </v-col>
              <v-col cols="6">
                <v-progress-linear color="green accent-4" indeterminate rounded height="6"></v-progress-linear>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  layout: 'clean',
  data() {
    return {
      logged_in_user: '',
      jwt_token: '',
      token_exp: '',
      oauth_access_token: '',
      user_loggedin: '',
    }
  },

  methods: {
    async getJwt() {
      //TODO: separar esto para que el login normal tambien pueda usar este metodo
      var responseauth = await this.$axios.$get(
        'http://168.197.48.101:8080/api/users/github/' + this.oauth_access_token
      )
      this.jwt_token = responseauth.token
      this.user_loggedin = responseauth.data
      //await this.$auth.setUser(this.user_loggedin)
      await this.$auth.setUserToken(this.jwt_token)

      this.$router.push('/')
    },
  },

  mounted() {
    this.oauth_access_token = this.$route.query.access_token
    this.getJwt()
  },
  created() {},
}
</script>
