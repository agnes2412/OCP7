<template>
  <div class="create_post">
    <Header />
    <div class="container_new_post">
      <p class="return">
        <i class="fas fa-long-arrow-alt-left"></i>
        <a :href="'http://localhost:8080/#/posts/'">Retour</a>
      </p>
      <article>
        <h3>Votre post</h3>
        <form class="new_post" @submit.prevent="newPost()">
          <label for="title_new_post"></label>
          <input
            id="title_new_post"
            type="text"
            placeholder="Votre titre..."
            v-model="title"
            required
          />
          <textarea
            id="content_new_post"
            placeholder="Votre contenu..."
            v-model="content"
          ></textarea>

          <button id="btn_new_post" type="submit">Publier votre post</button>
        </form>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";

export default {
  name: "CreatePost",
  components: {
    Header,
  },

  data() {
    return {
      posts: [],
      title: "",
      content: "",
      //id: "",
      userId: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },
  methods: {
    newPost() {
      axios
        .post(
          "http://localhost:3000/api/posts/",
          {
            //Je récupère le titre et le contenu du post
            title: this.title,
            content: this.content,
            //Je fournis la clé étrangère associé au post (renseignée dans le controlleur posts create.post)
            user: this.userId,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => console.log(res));
    },
  },
};
</script>

<style scoped>
.return {
  text-align: right;
  margin-right: 20px;
}
.container_new_post {
  max-width: 600px;
  margin: auto;
}
article {
  margin-top: 50px;
  max-height: 100px;
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border: 1px solid lightgrey;
  border-top: 6px solid rgb(141, 117, 117);
  padding: 5px;

  min-height: 300px;

  box-shadow: 5px 10px 10px rgb(141, 117, 117);
}

.new_post {
  display: flex;
  flex-direction: column;
}

input {
  padding: 10px;
  margin-bottom: 15px;
  margin-top: 5px;
}

textarea {
  padding: 10px;
  min-height: 90px;
  margin-bottom: 50px;
  margin-top: 5px;
}

button {
  padding: 7px 10px;
  border: 2px solid rgb(141, 117, 117);
  background-color: white;
  border-radius: 10px;
  float: right;
  margin-top: -35px;
  transition-duration: 0.6s;
  font-size: 0.9em;
  width: 200px;
}

button:hover {
  background-color: rgb(141, 117, 117);
  color: white;
}
</style>
