<template>
  <div class="d-flex flex justify-center align-center">
    <v-skeleton-loader v-if="loading" type="card-avatar, article, actions"> </v-skeleton-loader>
    <v-card v-else class="comunidad mx-2 mb-3 text-center" max-width="350">
      <v-icon :color="community.comm_category.iconColor" class="icons pt-6" x-large>
        mdi-{{ community.comm_category.icon }}
      </v-icon>
      <v-card-title class="text-h4 justify-center">{{ community.name.toUpperCase() }}</v-card-title>
      <v-card-subtitle class="pb-1 text-h4 text-center">#{{ community.comm_category.name }}</v-card-subtitle>
      <v-card-text class="text-h5 text-center">{{ community.description }}</v-card-text>
      <v-card-text class="text--primary text-left pt-0">
        <v-chip v-if="miembros == 1" color="secondary">{{ miembros }} miembro</v-chip>
        <v-chip v-else color="secondary">{{ miembros }} miembros</v-chip>
      </v-card-text>
      <!-- <v-divider class="mx-4"></v-divider> -->
      <!-- <v-card-title class="text-h5 justify-center">Categoria de Eventos</v-card-title> -->
      <!-- <v-card-text>
        <v-chip-group v-for="event in eventCategoriesFilter(communityEvents)" v-model="selection"
          active-class="accent-4 white--text" column>
          <v-chip>{{ event.event_category.name }}</v-chip>
        </v-chip-group>
      </v-card-text> -->
      <v-card-actions class="pa-1 pt-0 justify-space-around">
        <v-btn v-if="joined == true" large class="px-4 ma-1" color="commuButton" @click="unjoin" block
          >Des-Unirse</v-btn
        >
        <v-btn v-if="joined == false" large class="px-4 ma-1" color="commuButton" @click="join" block>Unirse</v-btn>
      </v-card-actions>
      <v-card-actions class="pa-1 pt-0 justify-space-around">
        <EventsAbm v-if="isMod" :mode="'C'" :communityId="this.community.id" :eventId="undefined" />
      </v-card-actions>
      <v-card-actions class="pa-1 pt-0 justify-space-around">
        <v-btn v-if="isMod" large class="px-4 ma-1" color="orange" @click="open_dialog_edit_comm" block
          >Modificar comunidad</v-btn
        >
      </v-card-actions>
      <v-card-actions class="pa-1 pt-0 justify-space-around">
        <v-btn v-if="isMod" large class="px-4 ma-1" color="red" @click="open_dialog_delete" block
          >Eliminar comunidad</v-btn
        >
      </v-card-actions>
    </v-card>
    <FormsNotification
      :show="noti.show"
      :notiType="noti.notiType"
      :header="noti.header"
      :text="noti.text"
      @notification="notification"></FormsNotification>
    <v-dialog v-model="dialog_edit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar comunidad</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name_edit" label="Nombre" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="desc_edit" label="Descripcion" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  :items="this.categories"
                  v-model="selected_cat_edit"
                  label="Categoria"
                  item-text="name"
                  item-value="id"
                  required></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="contrast" text @click="dialog_edit = false"> Cancelar </v-btn>
          <v-btn color="success" filled @click="edit_confirm"> Guardar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog_delete" max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Eliminar comunidad </v-card-title>
        <v-card-text> ¿Eliminar la comunidad? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="contrast" text @click="dialog_delete = false"> Cancelar </v-btn>
          <v-btn color="warning" fill @click="delete_confirm"> Eliminar </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.icons {
  font-size: 150px !important;
}
.comunidad {
  border: 1px solid rgba(82, 45, 168, 0.05) !important;
}
</style>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser']),
  },
  data: () => ({
    community: {},
    selection: 1,
    loading: true,
    joined: false,
    isMod: false,
    miembros: 0,
    noti: {
      show: false,
      notiType: true,
      header: '',
      text: '',
    },
    selected_cat_edit: '',
    categories: [],
    name_edit: '',
    desc_edit: '',
    dialog_edit: false,
    dialog_delete: false,
  }),
  props: {
    communityId: {
      type: Number,
    },
  },
  mounted() {
    this.getCommunity(this.communityId)
    this.getCategories()
  },
  methods: {
    notification(success) {
      if (success == true) {
        this.noti.show = false
        this.$router.go()
      } else {
        this.noti.show = false
        this.$router.go()
      }
    },
    eventCategoriesFilter(arr) {
      //Hacer filtro para quitar categorias repetidas de arr (communityEvents)
      //console.log(JSON.stringify(arr))
      return arr
    },
    getCommunity(id) {
      this.$axios
        .get('communities/' + id)
        .then((data) => {
          this.community = data.data
          this.loading = false
          this.miembros = data.data.user_communities.length
          this.community.user_communities.forEach(this.search)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async unjoin() {
      try {
        const response = await this.$axios.post('/communities/' + this.community.id + '/join')
        this.joined = false
        this.miembros = this.miembros - 1
      } catch (e) {
        console.log(e)
      }
    },
    async join() {
      try {
        const response = await this.$axios.post('/communities/' + this.community.id + '/join')
        this.joined = true
        this.miembros = this.miembros + 1
        if (response.status != 200) {
          throw response
        }
      } catch (e) {
        this.noti.header = 'Error al unirse a la comunidad'
        this.noti.text = 'Error' + e.response.status + ': ' + e.response.data.message
        this.noti.notiType = false
        this.noti.show = true
      }
    },
    search(item) {
      if (item.userId == this.$store.state.auth.user.id) {
        this.joined = true
        console.log(item)
        if (item.mod == true) {
          this.isMod = true
        }
      }
    },
    getCategories() {
      this.$axios
        .$get('commcategory')
        .then((res) => {
          this.categories = res
          console.log(res)
        })
        .catch((err) => console.log(err))
    },
    open_dialog_edit_comm() {
      this.selected_cat_edit = this.community.categoryId
      this.name_edit = this.community.name
      this.desc_edit = this.community.description
      this.dialog_edit = true
    },
    open_dialog_delete() {
      this.dialog_delete = true
    },
    async edit_confirm() {
      try {
        const response = await this.$axios.$put('communities/' + this.community.id, {
          name: this.name_edit,
          description: this.desc_edit,
          categoryId: this.selected_cat_edit,
        })
        this.community.name = this.name_edit
        this.community.description = this.desc_edit
        this.community.categoryId = this.selected_cat_edit
        this.dialog_edit = false
        this.$router.go()
      } catch (e) {
        this.noti.header = 'Error al actualizar usuario'
        this.noti.text = 'Error' + e.response.status + ': ' + e.user.response.message
        this.noti.notiType = false
        this.noti.show = true
      }
    },
    async delete_confirm() {
      try {
        await this.$axios.$delete('communities/' + this.community.id)
        this.dialog_delete = false
        this.$router.push('/communities/explore')
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
