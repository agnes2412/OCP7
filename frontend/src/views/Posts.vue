<template>
  <div class="posts">
    <Header />
    <div class="bloc-page">
      <div id="container">
        <div class="create_post">
          <h2>
            <a :href="'http://localhost:8080/#/createPost/'"
              >Créer votre post</a
            >
          </h2>
        </div>

        <!--post.id est la valeur actuelle passée en argument dans l'écouteur d'évènement qui apelle la fonction "deletePost()-->
        <article class="one_post" v-for="post in posts" :key="post.id">
          <button
            class="btn_delete_post"
            v-if="statut == 1 || userId == post.UserId"
            @click="deletePost(post.id)"
          >
            X
          </button>
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
          <span
            ><a :href="'http://localhost:8080/#/onePost/' + post.id"
              ><button class="btn_one_post">Voir le post</button></a
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
      // name: "",
      moment: moment,
      posts: [],
      //users: [],
      id: this.$route.params.id,
      statut: sessionStorage.getItem("userStatut"),
      userId: sessionStorage.getItem("userId"),
    };
  },

  methods: {
    //Le paramètre postId est le placeholder 
    deletePost(postId) {
      axios
        .delete("http://localhost:3000/api/posts/" + postId, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => console.log(res)); 
        window.location.reload()
    },
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
.posts {
  background-color: rgb(226, 225, 230);
}
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
  background-repeat: no-repeat;
  background-color: white;
  background-size: 60px;
  margin-bottom: 50px;
  min-height: 50px;
  box-shadow: 5px 10px 10px rgb(141, 117, 117);
  border-radius: 10px;
  margin-top: 20px;
  transition-duration: 0.8s;
  font-size: 0.9em;
}

h2 a {
  color:rgb(83, 83, 110);
}

h2 a:hover{
  color: white;
}

.create_post:hover {
  background-color: rgb(83, 83, 110);
  box-shadow: none;
}

article {
  color: rgb(65, 65, 88);
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border: 1px solid lightgrey;
  border-top: 6px solid rgb(241, 116, 116);
  min-height: 230px;
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 5px 10px 10px rgb(141, 117, 117);
}

.content_post {
  border-bottom: 1px solid rgb(83, 83, 110);
  border-top: 2px solid rgb(83, 83, 110);
  min-height: 140px;
  padding-top: 10px;
  text-align: left;
}

p {
  font-size: 0.8em;
  text-align: left;
}

.btn_delete_post {
  margin-top: 10px;
  color: rgb(241, 116, 116);
  font-weight: bold;
  font-size: 1em;
  border: none;
  font-weight: bold;
  width: 38px;
  box-shadow: none;
}

.btn_delete_post:hover {
  background-color: rgb(241, 116, 116);
  color: white;
  border: none;
}

.btn_one_post {
  border: 1px solid rgb(141, 117, 117);
}

button {
  padding: 7px 10px;
  border: 2px solid rgb(141, 117, 117);
  background-color: white;
  border-radius: 10px;
  margin-top: -35px;
  float: right;
  transition-duration: 0.6s;
  font-size: 1em;
  font-weight: bold;
  box-shadow: 3px 3px 5px rgb(141, 117, 117);
}

button:hover {
  background-color: rgb(224, 161, 161);
  box-shadow: none;
  border: 2px solid rgb(224, 161, 161);
  
}
</style>