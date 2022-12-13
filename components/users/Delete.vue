<template>
  <v-dialog v-model="dialog" hide-overlay transition="dialog-bottom-transition" width="95%">
    <template v-id v-slot:activator="{on, attrs}">
      <v-btn color="warning" x-large class="ma-1 my-4 px-16" block v-bind="attrs" v-on="on"> Eliminar usuario </v-btn>
    </template>
    <SkeletonAbm v-if="loading" :amount="1"></SkeletonAbm>
    <v-card v-else class="px-0 ma-0">
      <v-toolbar dark
        ><v-btn icon dark right @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title class="text-centers text-h4"> Eliminar usuario </v-toolbar-title>
      </v-toolbar>
      <h4 class="mt-5 mb-5 text-center text-h4">¿Seguro desea eliminar el usuario {{ name }}?</h4>
      <v-row class="ma-0">
        <v-col>
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            class="mb-4"
            :disabled="!valid"
            height="56px"
            x-large
            block
            @click.prevent="deleteUser">
            Eliminar Usuario
          </v-btn>
        </v-col>
      </v-row>
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
    name: '',
    noti: {
      show: false,
      success: true,
      header: '',
      text: '',
    },
  }),
  mounted() {
    this.getUser()
  },
  methods: {
    async deleteUser() {
      try {
        const user = await this.$axios.delete('/users')
        if (user.status == 200) {
          this.dialog = false
          this.noti.header = 'Usuario eliminado'
          this.noti.text = 'El usuario se ha eliminado. Nos vemos'
          this.noti.success = true
          this.noti.show = true
        } else {
          throw user
        }
      } catch (e) {
        this.noti.header = 'Error usuario no eliminado'
        this.noti.text = 'Error' + e.user.status + ': ' + e.user.data.message
        this.noti.success = false
        this.noti.show = true
      }
    },
    async getUser() {
      try {
        const user = await this.$axios.get('/users/me')
        this.name = user.data.data.name
      } catch (e) {
        console.log(e.message)
      }
    },
    notification(success) {
      if (success == true) {
        this.$router.push('/auth')
      } else {
        this.noti.show = false
      }
    },
  },
}
</script>
