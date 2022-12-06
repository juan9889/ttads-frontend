<template>
  <div>
    <v-menu v-if="isAuthenticated" bottom min-width="200px" rounded offset-y>
      <template v-slot:activator="{on, attrs}">
        <v-btn icon v-bind="attrs" v-on="on"> Perfil </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <h2>{{ loggedInUser.name }}</h2>
            <p class="text-caption mt-1">
              {{ loggedInUser.mail }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn deprecssed rounded text to="/user"> Editar cuenta </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn depressed rounded text @click="logout"> Cerrar sesion </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data() {
    return {
      // user: {
      //   initials: 'JD',
      //   fullName: 'John Doe',
      //   email: 'john.doe@doe.com',
      //   image: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
      //   icon: 'mdi-account',
      // },
    }
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/auth')
    },
  },
}
</script>
