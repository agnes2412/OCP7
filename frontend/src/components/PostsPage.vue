<template>
  <div id="container">
    <nav>Mon compte | Me déconnecter</nav>

    <article class="post" v-for="post in posts" :key="post.id">
      <div class="content_post">{{ post }}</div>
    </article>
    <input type="text" v-model="comment"/>
    <a href="http://localhost:8080/#/posts" @click="ajoutComment">Ajouter votre commentaire</a>
  </div>
</template>

<script>
//import axios from "axios";
// @ is an alias to /src

export default {
  name: "PostsPage",

  data() {
    return {
      title: "",
      posts: ["post 1, post 2, post 3"],
      comment: "Votre commentaire",
    };
  },
  methods: {
    ajoutComment(){
      this.posts.push(this.comment);
    }
  }
};
</script>

<style lang="scss">
nav {
  margin-bottom: 30px;
}

article {
  border: 2px solid rgb(255, 38, 0);
  height: 300px;
}
</style>