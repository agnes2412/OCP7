<template>
  <div id="posts">
    <Header />
    <div id="container">
      <a :href="'http://localhost:8080/#/createPost/'"
        ><div class="create_post">
          <h2>Créer votre post</h2>
        </div></a
      >

      <div class="container_post" v-for="post in posts" :key="post.id">
        <p class="date_post">
          <span>
            <!-- Je récupère le 'name'de mon model User -->
            {{ post.User.name }}</span
          >
          a publié ce post le
          {{ moment(post.createdAt).format("DD/MM/YY à H:mm") }}
        </p>
        <article>
          <!--post.id est la valeur actuelle passée en argument dans l'écouteur d'évènement qui appelle la fonction "deletePost()"-->
          <div>
            <span
              title="Supprimer"
              class="btn_delete_post"
              v-if="statut == 2 || user_id == post.UserId"
              @click="deletePost(post.id)"
            >
              X
            </span>
          </div>
          <h3 class="title_post">{{ post.title }}</h3>
          <div class="content_post">
            {{ post.content }}
          </div>
        </article>
        <a
          :href="'http://localhost:8080/#/onePost/' + post.id"
          title="Cliquez pour voir le post"
          ><button class="btn_display_comment">
            Voir les commentaires du post
          </button></a
        >
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
const moment = require("moment");
import Header from "@/components/Header.vue";
const statut = sessionStorage.getItem("userStatut");

export default {
  name: "Posts",
  components: {
    Header,
  },
  data() {
    return {
      moment: moment,
      //Je déclare un tableau vide qui va contenir les posts des utilisateurs et un autre les utilisateurs
      posts: [],
      users: [],
      statut: sessionStorage.getItem("userStatut"),
      user_id: sessionStorage.getItem("userId")
    };
  },

  methods: {
    //Le paramètre postId est le placeholder
    deletePost(postId) {
      let alert = confirm("Voulez-vous vraiment supprimer ce post ?");
      if (alert) {
        axios
          .delete("http://localhost:3000/api/posts/" + postId, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
          .then((res) => console.log(res));
        window.location.reload();
      }
    },
  },

  mounted() {
    if (statut == 1) {
      alert("Votre compte est bloqué, veuillez contacter l'administrateur");
      sessionStorage.clear();
      location.href = "http://localhost:8080/#";
    } else {
      //J'envoie la requête vers le back
      axios
        .get("http://localhost:3000/api/posts/", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        //Je récupère tous les posts que me renvoie le back(res.data) et je les mets dans le tableau posts
        .then((res) => (this.posts = res.data));

      axios
        .get("http://localhost:3000/api/auth/", {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => console.log(res));
    }
  },
};
</script>

<style scoped>
#posts {
  background-color: rgb(226, 203, 203);
}

#container {
  padding: 5px;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: auto;
}

.create_post {
  max-height: 100px;
  background-color: white;
  min-height: 50px;
  box-shadow: 3px 3px 3px rgb(68, 67, 67);
  border-radius: 10px;
  margin-top: 20px;
  margin-bottom: 50px;
  transition-duration: 0.8s;
  font-size: 0.9em;
}

.create_post:hover {
  background-color: rgb(83, 83, 110);
  box-shadow: none;
}

h2 {
  color: rgb(83, 83, 110);
  padding: 20px;
}

h2:hover {
  color: white;
}

article {
  color: rgb(65, 65, 88);
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border: 1x solid rgb(83, 83, 110);
  min-height: 240px;
  padding: 5px;
  box-shadow: 3px 3px 3px rgb(68, 67, 67);
}

h3 {
  margin-top: 0;
  margin-bottom: 5px;
  text-align: left;
  padding: 10px 30px 20px 60px;
  border-bottom: 3px solid rgb(246, 178, 178);
}

.content_post {
  margin-top: 5px;
  font-size: 18px;
  border-radius: 13px;
  min-height: 150px;
  padding: 10px;
  text-align: justify;
  font-weight: normal;
}

p {
  margin-bottom: 3px;
  margin-top: 5px;
  font-size: 1em;
  text-align: left;
  margin-left: 5px;
  font-weight: bold;
}

.btn_delete_post {
  margin-right: 10px;
  font-size: 1.4em;
  margin-top: 15px;
  color: rgb(245, 73, 73);
  font-weight: bold;
  float: right;
  width: 35px;
  cursor: pointer;
   transition-duration: 0.6s;
}

.btn_delete_post:hover {
  color: black;
  font-size: 1.5em;
}

.btn_display_comment {
  margin-top: 20px;
  margin-bottom: 80px;
  font-size: 1.2em;
  padding: 9px;
  max-width: 300px;
  transition-duration: 0.6s;
  border: 2px solid rgb(83, 83, 110);
  background-color: white;
  box-shadow: 3px 3px 5px rgb(32, 32, 42);
}

.btn_display_comment:hover {
  background-color: rgb(83, 83, 110);
  cursor: pointer;
  color: white;
  box-shadow: none;
  border: 2px solid white;
}
</style>