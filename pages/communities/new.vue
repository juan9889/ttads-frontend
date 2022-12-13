<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="name" :counter="10" label="Nombre" required></v-text-field>

    <v-text-field v-model="description" :counter="10" :rules="nameRules" label="Descripcion" required></v-text-field>

    <v-select
      :items="this.categories"
      v-model="select"
      label="Categoria"
      item-text="name"
      item-value="id"
      required></v-select>

    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate"> Crear comunidad </v-btn>

    <v-snackbar v-model="snackbar_success" right top color="success">
      {{ this.snackbar_text }}

      <template v-slot:action="{attrs}">
        <v-btn color="contrast" text v-bind="attrs" @click="snackbar_success = false"> x </v-btn>
      </template>
    </v-snackbar>
  </v-form>
</template>
<script>
export default {
  data() {
    return {
      valid: true,
      name: '',
      description: '',
      select: '',
      categories: [],
      snackbar_success: false,
      snackbar_text: '',
    }
  },

  methods: {
    async validate() {
      this.$refs.form.validate()
      await this.create()
    },
    async create() {
      try {
        await this.$axios.post('/communities', {
          name: this.name,
          description: this.description,
          categoryId: this.select,
        })
        this.snackbar_text = 'Se creo la comunidad correctamente'
        this.snackbar_success = true
        this.$router.push('/communities/explore')
      } catch (e) {
        console.log(e)
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
  },
  mounted() {
    this.getCategories()
  },
}
</script>
