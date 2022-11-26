<template>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card :color="success == true ? 'success' : 'warning'">
      <v-card-title class="text-h5"> {{ header }}</v-card-title>
      <v-card-text> {{ text }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="contrast" text @click="close"> Aceptar </v-btn>
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
    success: {
      type: Boolean,
      default: true,
    }, // 'C' 'U' 'D'
    header: String,
    text: String,
    show: Boolean,
  },
  methods: {
    close() {
      console.log(this.success)
      this.$emit('notification', this.success)
    },
  },
  watch: {
    show(newValue) {
      this.dialog = newValue
    },
  },
}
</script>
