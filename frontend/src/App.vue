<template>
<router-view/>
</template>


<script>
export default {
  name: "App",
data() {
    return {
      statut: sessionStorage.getItem('userAdmin')
    };
  },
}
  
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: black;
}
  a {
    font-weight: bold;
    color: black;
    text-decoration: none;

    &.router-link-exact-lien {
      color: #ad4605;
    }
  }

</style>
