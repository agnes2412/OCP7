<template>
  <nav>
    <span @click="userAccount()">Mon compte</span> |
    <span id="btn_disconnect" @click="disconnect()">Me déconnecter</span>

    <button v-if="statut === 1">| Admin</button>
  </nav>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      statut: sessionStorage.getItem('userStatut'),
    }
  },
  mounted() {
console.log(this.statut);
  },

  methods: {
    userAccount() {
      window.location.href = "http://localhost:8080/#/userAccount";
    },

    disconnect() {
      sessionStorage.removeItem("user");
      window.location.href = "http://localhost:8080";
    },
  },
  adminPage() {
    window.location.href = "http://localhost:8080";
  },
};
</script>

<style scoped>
nav span {
  cursor: pointer;
}

nav {
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: rgb(245, 239, 239);
  margin-top: 5px;
  margin-bottom: 20px;
}
</style>