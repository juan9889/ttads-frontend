<template>
  <v-avatar v-if="user.image" size="36px">
    <img id="avatar" alt="Avatar" :src="user.image" />
  </v-avatar>
  <v-avatar v-else color="brown">
    <span class="white--text text-h5">{{ user.initials }}</span>
  </v-avatar>
</template>
<script>
export default {
  data() {
    return {
      user: {
        initials: 'JD',
        fullName: 'John Doe',
        email: 'john.doe@doe.com',
        image: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
        icon: 'mdi-account',
      },
    }
  },
}
</script>
