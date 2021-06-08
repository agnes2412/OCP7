<template>
  <div class="posts">
    <Header />
    <div class="bloc-page">
      <div id="container">
        <div class="create_post">
          <div id="btn_new_post" type="submit">
            <a :href="'http://localhost:8080/#/createPost/'"
              >Créer votre post</a
            >
          </div>
        </div>

        <article class="one_post" v-for="post in posts" :key="post.id">
          <button
            class="btn_delete"
            v-if="statut == 1 || userId === post.userId"
            @click="deletePost()"
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
     // name: "",
      moment: moment,
      //post: [],
      posts: [],
      //users: [],
      id: this.$route.params.id,
      statut: sessionStorage.getItem("userStatut"),
      userId: sessionStorage.getItem("userId"),
    };
  },

  methods: {
    deletePost() {
      axios
        .delete("http://localhost:3000/api/posts/" + this.id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => console.log(res)); //(this.users = res.data.name));
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
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border: 1px solid lightgrey;
  border-top: 6px solid rgb(141, 117, 117);
  padding-top: 20px;
  margin-bottom: 30px;
  min-height: 50px;
  box-shadow: 5px 10px 10px rgb(141, 117, 117);
}

#btn_new_post {
  cursor: pointer;
  text-align: center;
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
  float: right;
  margin-top: -35px;
  transition-duration: 0.6s;
  font-size: 0.9em;
}

button:hover {
  background-color: rgb(141, 117, 117);
  color: white;
}
</style>