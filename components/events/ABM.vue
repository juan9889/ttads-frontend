<template>
  <div>
    <v-text-field label="Titulo" v-model="title" required></v-text-field>
    <v-text-field box label="label" v-model="value"></v-text-field>
    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
      transition="scale-transition" offset-y min-width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="date" label="Picker in menu" prepend-icon="mdi-calendar" readonly v-bind="attrs"
          v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="date" no-title scrollable>
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu = false">
          Cancel
        </v-btn>
        <v-btn text color="primary" @click="$refs.menu.save(date)">
          OK
        </v-btn>
      </v-date-picker>
    </v-menu>
    <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time"
      transition="scale-transition" offset-y max-width="290px" min-width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="time" label="Picker in menu" prepend-icon="mdi-clock-time-four-outline" readonly
          v-bind="attrs" v-on="on"></v-text-field>
      </template>
      <v-time-picker v-if="menu2" format="24hr" v-model="time" full-width @click:minute="$refs.menu.save(time)"></v-time-picker>
    </v-menu>

  </div>

</template>
<script>
export default {
  data() {
    return {
      title: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: null,
      menu2: false,
      menu: false,
      description: '',
      photo: '',
      place: ''
    }
  }
}
</script>