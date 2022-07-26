<template>
  <v-footer
    app
    color="tertiary"
    height="50"
    inset
  >
    <Chatbox/>
  </v-footer>
</template>

<script>
import Chatbox from './Chatbox.vue';
export default {
    components: { Chatbox }
}
</script>