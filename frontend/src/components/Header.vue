<template>
  <header>
    <img src="../assets/icon-left-font-monochrome-white.png" alt="" />

    <div class="deco"></div>
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
  background-color: rgb(41, 45, 73);
  box-shadow: 3px 3px 5px black;
}

.deco {
  width: 75%;
  margin-top: -120px;
  margin-bottom: 100px;
  border-bottom: 5px solid rgb(165, 59, 77);
}

nav span {
  cursor: pointer;
}

a {
  color: white;
  font-size: 1.1em;
}

nav {
  margin-right: 40px;
  padding-top: 0;
  padding-bottom: 30px;
  background-color: rgb(41, 45, 73);
  margin-top: -80px;
  margin-bottom: 20px;
}
</style>