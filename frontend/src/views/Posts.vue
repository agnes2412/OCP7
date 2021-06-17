<template>
  <div class="posts">
    <Header />
      <div id="container">
        <a :href="'http://localhost:8080/#/createPost/'" 
          ><div class="create_post">
            <h2>Créer votre post</h2>
          </div></a
        >

        <!--post.id est la valeur actuelle passée en argument dans l'écouteur d'évènement qui appelle la fonction "deletePost()-->
        <div class="container_post" v-for="post in posts" :key="post.id">
          <p class="date_post">
              Post publié le
              {{ moment(post.createdAt).format("DD/MM/YY à H:mm") }} par
              <span>
                <!-- Je récupère le 'name'de mon model User -->
                {{ post.User.name }}</span
              >
            </p>
        <article>
          <a :href="'http://localhost:8080/#/onePost/' + post.id" title="Cliquez pour voir le post">
            <button title="Supprimer"
              class="btn_delete_post"
              v-if="statut == 2 || user_id == post.UserId"
              @click="deletePost(post.id)"
            >
              X
            </button>
            <h3 class="title_post">{{ post.title }}</h3>
            <div class="content_post">
              {{ post.content }}
            </div>
            <div class="image_post"><img :src="post.image" alt="image"></div>
            
          </a>
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
    Header,
  },
  data() {
    return {
      title: "",
      content: "",
      // name: "",
      moment: moment,
      posts: [],
      image: null,
      //users: [],
      post_id: this.$route.params.id,
      statut: sessionStorage.getItem("userStatut"),
      user_id: sessionStorage.getItem("userId"),
      //post_statut: sessionStorage.getItem("postStatut")
    };
  },

  methods: {
   // refused() {
      //this.userStatut = 2;
      //J'appelle la fonction pour mettre à jour la base de données
      //this.deletedPost();
   // },

   // deletePost(postId) {
     // axios
       // .put("http://localhost:3000/api/posts/" + postId, {
         // headers: {
          //  Authorization: "Bearer " + sessionStorage.getItem("token"),
         // },
       // })
        //.then((res) => console.log(res));
     // window.location.reload();

   // }
    //Le paramètre postId est le placeholder
    deletePost(postId) {
      axios
        .delete("http://localhost:3000/api/posts/" + postId, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => console.log(res));
      window.location.reload();
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
  background-color: rgb(245, 234, 234);
}

#container {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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

h2 {
  color: rgb(83, 83, 110);
  padding: 20px;
}

h2:hover {
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
  min-height: 230px;
  padding: 5px;
  margin-bottom: 60px;
  box-shadow: 3px 3px 3px rgb(68, 67, 67);
}

h3 {
  margin-top: 15px;
  text-align: left;
  margin-left: 60px;  
}
.content_post {
  font-size: 18px;
  border: 2px solid rgb(83, 83, 110);
  border-radius: 15px ;
  min-height: 140px;
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
  margin-top: 10px;
  color: rgb(241, 116, 116);
  font-weight: bold;
  font-size: 1em;
  border: none;
  font-weight: bold;
  width: 38px;
  box-shadow: none; 
  transition-duration: 0.6s;
  margin-right: 10px;;
}

.btn_delete_post:hover {
  font-size: 1.3em;
  border: none;
  cursor: pointer;
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

</style>