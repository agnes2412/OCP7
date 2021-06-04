<template>
  <div class="posts">
    <Header />
    <div class="bloc-page">
      <div id="container">
        <h3>Votre post</h3>
        <div class="create_post">
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
              class="content_new_post"
              placeholder="Votre contenu..."
              v-model="content"
            ></textarea>

            <button id="btn_new_post" type="submit">Publier votre post</button>
          </form>
        </div>

        <article class="one_post" v-for="post in posts" :key="post.id">
          <button class="btn_delete" v-if="statut == 1">X</button>
          <h4 class="title_post">{{ post.title }}</h4>
          <div class="content_post">
            {{ post.content }}
          </div>
          <p class="date_post">
            Post publié le
            {{ moment(post.createdAt).format("DD/MM/YY à H: mm") }} par
            <span>
              <!-- Je récupère le 'name'de mon model User -->
              {{ post.User.name }}</span
            >
          </p>
          <span class="btn_one_post"
            ><a :href="'http://localhost:8080/#/onePost/' + post.id"
              ><button>Voir le post</button></a
            ></span
          >
        </article>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
const moment = require("moment");
import Header from "@/components/Header.vue";

export default {
  name: "Posts",
  components: {
    //PostsPage,
    Header,
    //OnePost
  },
  data() {
    return {
      title: "",
      content: "",
      name: "",
      moment: moment,
      posts: [],
      users: [],
      user: "",
      id: this.$route.params.id,
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/posts/", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.posts = res.data));

    axios
      .get("http://localhost:3000/api/auth/", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res)); //(this.users = res.data.name));
  },
};
</script>

<style scoped>
nav {
  margin-bottom: 30px;
}

#container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 600px;
  margin: auto;
}

.create_post {
  margin-top: 20px;
  max-height: 100px;
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border: 1px solid lightgrey;
  border-top: 6px solid rgb(141, 117, 117);
  padding: 5px;
  margin-bottom: 30px;
  min-height: 230px;
  box-shadow: 5px 10px 10px rgb(141, 117, 117);
}

h3 {
  transition-duration: 0.4s;
}

h3:hover {
  color: #f4330d;
  font-size: 1.2em;
}

article {
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border: 1px solid lightgrey;
  border-top: 6px solid rgb(141, 117, 117);
  min-height: 230px;
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 5px 10px 10px rgb(141, 117, 117);
}

.content_post {
  border-bottom: 1px solid #f4330d;
  border-top: 2px solid #f4330d;
  min-height: 140px;
  padding-top: 10px;
  text-align: left;
}

p {
  font-size: 0.8em;
  text-align: left;
}

.btn_delete {
  margin-top: 10px;
  color: #f4330d;
  font-weight: bold;
}

button {
  padding: 7px 10px;
  border: 2px solid rgb(141, 117, 117);
  background-color: white;
  border-radius: 10px;
  position: relative;
  float: right;
  margin-top: -35px;
  transition-duration: 0.4s;
  font-size: 0.9em;
}

button:hover {
  background-color: rgb(141, 117, 117);
  color: white;
}
</style>