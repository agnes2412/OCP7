<template>
  <header>
    <img src="../assets/icon-left-font-monochrome-white.png" alt="" />
    <nav>
      <span @click="disconnect()"
        ><a :href="'http://localhost:8080'">Me déconnecter </a></span
      >

      <span v-if="statut == 0"
        ><a :href="'http://localhost:8080/#/userAccount'"
          >| Mon compte
        </a></span
      >

      <span v-if="statut == 2"
        ><a :href="'http://localhost:8080/#/admin'">| Admin</a></span
      >
    </nav>
  </header>
</template>

<script>
//import axios from "axios";
export default {
  name: "Header",

  data() {
    return {
      users: [],
      User: [],
      user_id: sessionStorage.getItem("userId"),
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
img {
  width: 100%;
  max-width: 300px;
  margin-top: -110px;
}

header {
  background-color: rgb(83, 83, 110);
  box-shadow: 3px 3px 5px black;
}

nav span {
  cursor: pointer;
}

a {
  color: white;
  font-size: 1.1em;
}

nav {
  padding-top: 0;
  padding-bottom: 40px;
  background-color: rgb(83, 83, 110);
  margin-top: -100px;
  margin-bottom: 20px;
}
</style>