<template>
  <v-menu bottom min-width="200px" rounded offset-y>
    <template v-slot:activator="{on}">
      <v-btn class="mx-auto" icon x-large y-large v-on="on">
        <UserAvatar />
      </v-btn>
    </template>
    <v-card>
      <v-list-item-content class="justify-center">
        <div class="mx-auto text-center">
          <UserAvatar />
          <h3>{{ user.fullName }}</h3>
          <p class="text-caption mt-1">
            {{ user.email }}
          </p>
          <v-divider class="mx-3"></v-divider>
          <v-btn depressed rounded text> Settings </v-btn>
          <v-divider class="mx-3"></v-divider>
          <v-btn depressed rounded text> Disconnect </v-btn>
          <v-divider class="mx-3"></v-divider>
          <v-btn depressed rounded text> AAAA </v-btn>
        </div>
      </v-list-item-content>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: true,
      mini: true,
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
      },
    }
  },
}
</script>
