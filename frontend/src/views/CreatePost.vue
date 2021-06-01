<template>
    <div class="create_post">
      <h3>Votre post</h3>
      <form class="new_post" @submit.prevent="newPost()">
        <label for="title_new_post"></label>
        <input id="title_new_post" type="text" placeholder="Votre titre..." v-model="title" required>
        <textarea id="content_new_post" placeholder="Votre contenu..." v-model="content"></textarea>

        <button id="btn_new_post" type="submit">Publier votre post</button></form>
          
        </div>
</template>

<script>
import axios from "axios";

export default {
  name: "CreatePost",

  data() {
    return {
      title: "",
      content: "",
      //statut: sessionStorage.getItem("userStatut"),
    };
  },
  methods: {
    newPost() {
      axios.post("http://localhost:3000/api/posts", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
       .then((res) => console.log(res));
    },
  },
};
</script>

<style scoped>
</style>
