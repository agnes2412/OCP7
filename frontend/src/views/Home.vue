
<template>
  <div class="home">
    <div id="nav">
      <router-link to="/signup">Inscription</router-link> |
      <router-link to="/login">Connexion</router-link>
    </div>
    <div id="logo">
      <img alt="Groupomania logo" src="../assets/icon-above-font.png" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
</script>

<style lang="scss">
img {
  width: 100%;
}

.home {
  max-width: 700px;
  margin: auto;
}

#nav {
  margin-top: 30px;
  margin-bottom: 100px;
}
</style>
