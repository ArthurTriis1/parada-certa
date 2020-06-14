<template>
  <v-app-bar color="#88D81E" class="header">
    <div class="user" v-if="!backButton" @click="goToProfile">
      <img class="userImg" src="./../../assets/user.png">
      <p class="userName">Edimilson</p>
    </div>
    <v-btn icon v-else @click="backNav">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <div class="customHeader__logo">
      <img src="./../../assets/parada-certa-logo.png" alt="">
    </div>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    backButton: function() {
      return this.$route.name === 'profile'
    }
  },

  methods: {
    goToProfile() {
      this.$router.push({ name: 'profile' })
    },

    backNav() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>