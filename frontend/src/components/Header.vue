<template>
  <div>
    <img src="../assets/icon-left-font-monochrome-white.png" alt="" />
    <nav>
      <!-- <span @click="userAccount()">Mon compte</span> |
  
  <span v-if="statut == 1" @click="adminPage()"> | Admin</span>-->
      <span @click="disconnect()"
        ><a :href="'http://localhost:8080'">Me déconnecter </a></span
      >

      <span 
        ><a :href="'http://localhost:8080/#/userAccount'"
          >| Mon compte
        </a></span
      >

      <span v-if="statut == 1"
        ><a :href="'http://localhost:8080/#/admin'">| Admin</a></span
      >
    </nav>
  </div>
</template>

<script>
//import axios from "axios";
export default {
  name: "Header",

  data() {
    return {
      users: [],
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
img {
  width: 100%;
  max-width: 300px;
  margin-top: -110px;
}

div {
  background-color: rgb(83, 83, 110);
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
  box-shadow: 0px 6px 3px rgb(141, 117, 117);
}
</style>