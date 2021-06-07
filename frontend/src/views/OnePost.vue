<template>
  <div class="one_post">
    <Header />
    <div class="container_one_post">
    <article>
      <h3>{{ post.title }}</h3>
      <div class="content_post">
        {{ post.content }}
      </div>
      <p class="date_post">
        Post publié le
        {{ moment(post.createdAt).format("DD/MM/YY à H: mm") }} par {{  }}
        <span>
          <!-- Je récupère le 'name'de mon model User -->
          {{  }}</span>
      </p>
    </article>

    <div class="one_comment" v-for="comment in comments" :key="comment.id">
      <button class="btn_delete" v-if="statut == 1">X</button>
      <div class="content_comment">
        {{ comment.content }}
      </div>
    </div>

    <div class="container_new_comment">
      <form class="new_comment" @submit.prevent="newComment()">
        <h4>Laissez votre commentaire</h4>
        <p>{{}}</p>
        <textarea
          id="content_new_comment"
          placeholder="Votre commentaire..."
          v-model="content"
        ></textarea>

        <button id="btn_new_comment" type="submit">
          Publier votre commentaire
        </button>
      </form>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
const moment = require("moment");
//@ is an alias to /src

export default {
  name: "OnePost",
  components: {
    Header,
  },

  data() {
    return {
      content: "",
      moment: moment,
      users: [],
      post: "",
      name: "",
      comments: [],
      id: this.$route.params.id,
      userId: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },

    methods: {
    newcomment() {
      console.log();
      axios
        .post(
          "http://localhost:3000/api/comment/",
          {
            content: this.content,
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

  mounted() {
    axios
      .get("http://localhost:3000/api/comment/", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.comments = res.data));//console.log(res));

    axios
      .get("http://localhost:3000/api/posts/" + this.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.post = res.data));

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

.container_one_post {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 600px;
  margin: auto;

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

form {
  display: flex;
  flex-direction: column;
  min-height: 150px;
  padding: 5px;
  margin-bottom: 30px;
}

textarea {
  padding: 10px;
  min-height: 40px;
  margin-bottom: 50px;
}

button {
  padding: 7px 10px;
  border: 2px solid rgb(141, 117, 117);
  background-color: white;
  border-radius: 10px;
  float: right;
  margin-top: 10px;
  transition-duration: 0.6s;
  font-size: 0.9em;
  width: 200px;
}

button:hover {
  background-color: rgb(141, 117, 117);
  color: white;
}
</style>
