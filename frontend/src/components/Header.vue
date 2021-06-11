<template>
  <nav>
    <!-- <span @click="userAccount()">Mon compte</span> |
  
  <span v-if="statut == 1" @click="adminPage()"> | Admin</span>-->

    <span @click="disconnect()"
      ><a :href="'http://localhost:8080'">Me déconnecter </a></span
    >

    <span
      ><a :href="'http://localhost:8080/#/userAccount'">| Mon compte </a></span
    >

    <span v-if="statut == 1"
      ><a :href="'http://localhost:8080/#/admin'">| Admin</a></span
    >
  </nav>
</template>

<script>

export default {
  name: "Header",

  data() {
    return {
      user: [],
      User: [],
      userId: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  methods: {
    disconnect() {
      sessionStorage.clear();
    },
  },
};
</script>

<style scoped>
nav span {
  cursor: pointer;
}

nav {
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: rgb(245, 239, 239);
  margin-top: 5px;
  margin-bottom: 20px;
  box-shadow: 0px 6px 3px rgb(141, 117, 117);
}
</style>