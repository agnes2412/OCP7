<template>
  <nav>
    <router-link to="/user_account">Mon compte</router-link> |
    <span id="btn_disconnect" @click="disconnect()">Me déconnecter</span>
  </nav>
</template>

<script>
export default {
  name: "Header",

  methods: {
    disconnect() {
      localStorage.removeItem("user");
      window.location.href = "http://localhost:8080/#/";
    },
  },
};
</script>

<style lang="scss">

nav span {
    cursor: pointer;
}

</style>
