<template>
  <div id="container">
    <div class="new_post">
      <h2>Votre nouveau post</h2>
    </div>

    <article class="one_post" v-for="post in posts" :key="post.id">
      <p>Post publié le {{ post.createdAt }} par {{  }}</p>
      <button v-if= "this.statut === 1">Supprimer</button>
      <h3 class="title_post">{{ post.title }}</h3>
      <div class="content_post">{{ post.content }}</div>
      <div class="comment_post">
      </div>
    </article>

  </div>
</template>

<script>
import axios from "axios";
//@ is an alias to /src

export default {
  name: "PostsPage",

  data() {
    return {
      posts: [],
      statut: sessionStorage.getItem('userAdmin')
    };
  },

  mounted() {
      axios
        .get("http://localhost:3000/api/posts/", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem('token')
          }
        })
        .then((res) => this.posts = res.data);
  },
};
</script>

<style lang="scss">
nav {
  margin-bottom: 30px;
}

article {
  border: 2px solid rgb(255, 38, 0);
  height: 300px;
  padding: 10px;
  margin: 10px;
}
</style>