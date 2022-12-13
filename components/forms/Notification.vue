<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card :color="notiType == true ? 'success' : 'warning'">
      <v-card-title class="text-h5"> {{ header }}</v-card-title>
      <v-card-text> {{ text }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="contrast" v-if="!notiType" text @click="cancel"> Cancelar </v-btn>
        <v-btn color="contrast" text @click="success"> Aceptar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    }
  },
  props: {
    notiType: {
      type: Boolean,
      default: true,
    }, // 'C' 'U' 'D'
    header: String,
    text: String,
    show: Boolean,
  },
  methods: {
    success() {
      this.$emit('notification', true)
    },
    cancel() {
      this.$emit('notification', false)
    },
  },
  watch: {
    show(newValue) {
      this.dialog = newValue
    },
  },
}
</script>
