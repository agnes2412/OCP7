<template>
  <div id="container">
    <nav>Mon compte | Me déconnecter</nav>

    <article>
        <div class="title_post"></div>
        <div class="content_post"></div>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "PostsPage",
  components: {},
};
</script>

<style lang="scss">

nav {
    margin-bottom: 30px;;
}

article {
border: 2px solid rgb(255, 38, 0);
height: 300px;
}

</style>