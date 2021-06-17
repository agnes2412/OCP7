
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
//import router from 'vue-router';
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
};
/*router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('token');
    if (token) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
});*/
</script>

<style scoped>

img {
  width: 100%;
}

.home {
  max-width: 700px;
  margin: auto;
}

#nav {
  font-size: 1.2em;
  margin-top: 30px;
  margin-bottom: 100px;
}
</style>
