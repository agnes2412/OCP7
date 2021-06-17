<template>
  <div class="one_post">
    <Header />
    <div class="container">
      <p class="return">
        <i class="fas fa-long-arrow-alt-left"></i>
        <a :href="'http://localhost:8080/#/posts/'">Retour</a>
      </p>
      <article>
        <h3>{{ post.title }}</h3>
        <div class="content_post">
          {{ post.content }}
        </div>
        <div>{{ post.image }}</div>
        <p class="date_post">
          Post publié le
          {{ moment(post.createdAt).format("DD/MM/YY à H:mm") }} par {{  }}
        </p>
      </article>

      <div class="one_comment" v-for="comment in comments" :key="comment.id">
        <!-- Seuls les statuts admin et le user associé au comment peuvent le supprimer-->
        <button
          class="btn_delete_comment"
          v-if="statut == 2 || user_id == comment.UserId"
          @click="deleteComment(comment.id)"
        >
          X
        </button>
        <div class="user_name_comment">{{ comment.User.name }} a écrit :</div>
        <div class="content_comment">
          {{ comment.content }}
        </div>
      </div>

      <div class="container_new_comment">
        <h4>Laissez votre commentaire</h4>
        <form class="new_comment" @submit.prevent="newComment()">
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
      name:{},
      moment: moment,
      content:"",
      //posts: [],
      users: [],
      post: {},
      comments: [],
      comment: {},
      image: null,
      //segment dynamique pour afficher le post d'un user
      id: this.$route.params.id,
      user_id: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  methods: {
    newComment() {
      //const post = post.userId.name;
      axios
        .post(
          "http://localhost:3000/api/comment/",
          {
            //content: this.content,
            // UserId: this.userId,
            //PostId: this.id,
            content: this.content,
            user_id: this.user_id,
            post_id: this.id,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => console.log(res));
      window.location.reload();
    },

    deleteComment(commentId) {
      axios
        .delete("http://localhost:3000/api/comment/" + commentId, {
          //comment: this.comment,
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
      .get("http://localhost:3000/api/comment/" + this.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.comments = res.data)); //console.log(res));

    axios
      //Je récupère l'id du post via l'url router.get(':id, userCtrl.getOnePost)
      .get("http://localhost:3000/api/posts/" + this.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.post = res.data));
  },
};
</script>

<style scoped>
.one_post {
 background-color: rgb(245, 234, 234);
 padding-bottom: 200px;;
}

.container {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 600px;
  margin: auto;
}

.return {
  text-align: right;
}

.return:hover {
  text-decoration: underline;
}

article {
  margin-top: 10px;
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border-top: 6px solid rgb(241, 116, 116);
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 3px 3px 3px rgb(68, 67, 67);
}

.date_post {
  font-size: 0.8em;
  text-align: left;
}

.content_post {
  border-bottom: 1px solid rgb(83, 83, 110);
  font-size: 18px;
  border-top: 2px solid rgb(241, 116, 116);
  min-height: 140px;
  padding: 10px;
  text-align: justify;
}

.btn_modify_post {
  padding: 7px 10px;
  background-color: white;
  border: 2px solid rgb(83, 83, 110);
  border-radius: 10px;
  float: right;
  margin-top: -8px;
  transition-duration: 0.6s;
  font-size: 1.2em;
  cursor: pointer;
}

.btn_modify_post:hover {
  background-color: rgb(83, 83, 110);
  color: white;
  box-shadow: none;
}

.user_name_comment {
  margin-left: 10px;
  color: rgb(83, 83, 110);
  font-weight: bold;
  text-align: left;
  margin-bottom: 5px;;
}

.content_comment {
  background-color: white;
  border-radius: 10px;
  min-height: 20px;
  padding: 15px;
  margin-bottom: 25px;
  text-align: justify;
  box-shadow: 3px 3px 5px rgb(83, 83, 110);
}

form {
  display: flex;
  flex-direction: column;
  min-height: 150px;
  padding: 5px;
}

.btn_delete_comment {
  margin-right: 10px;
  font-size: 1.2em;
  margin-top: 25px;
  color: rgb(248, 88, 88);
  border: none;
  font-weight: bold;
  width: 35px;
  background-color: white;
}

.btn_delete_comment:hover {
  font-size: 1.3em;
  color: black;
  background-color: white;
}

textarea {
  padding: 10px;
  min-height: 40px;
  margin-bottom: 20px;
  box-shadow: inset 3px 3px 5px rgb(83, 83, 110);
}

button {
  padding: 10px 12px;
  border: 2px solid rgb(83, 83, 110);
  background-color: white;
  border-radius: 10px;
  margin-top: 10px;
  float: right;
  transition-duration: 0.6s;
  font-size: 0.9em;
  max-width: 200px;
  cursor: pointer;
}

button:hover {
  background-color: rgb(83, 83, 110);
  color: white;
  box-shadow: none;
}
</style>
