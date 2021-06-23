<template>
  <div id="onepost">
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
      </article>

      <div class="one_comment" v-for="comment in comments" :key="comment.id">
        <!-- Seuls les statuts admin et le user associé au comment peuvent le supprimer-->
        <span
          class="btn_delete_comment"
          v-if="statut == 2 || user_id == comment.UserId"
          @click="deleteComment(comment.id)"
        >
          X
        </span>
        <div class="user_name_comment" v-if="user_id == comment.UserId">
          {{ msgCommentUser }} le
          {{ moment(comment.createdAt).format("DD/MM/YY à H:mm") }}
        </div>
        <div class="name_comment" v-else>
          {{ comment.User.name }} a écrit le
          {{ moment(comment.createdAt).format("DD/MM/YY à H:mm") }}
        </div>
        <div class="content_comment_user" v-if="user_id == comment.UserId">
          {{ comment.content }}
        </div>
        <div class="content_comment" v-else>{{ comment.content }}</div>
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
      moment: moment,
      content: "",
      users: [],
      post: {},
      comments: [],
      msgCommentUser: "Vous avez écrit ",
      //segment dynamique pour afficher le post d'un user
      id: this.$route.params.id,
      user_id: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  methods: {
    newComment() {
      axios
        .post(
          "http://localhost:3000/api/comment/",
          {
            //C'est le corps de ma requête (req.body.content)
            content: this.content,
            //Je demande les clés étrangères de la table post
            user_id: this.user_id,
            post_id: this.id,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          window.location.reload();
        })
        .catch((error) => console.log(error));
    },

    deleteComment(commentId) {
      let alert = confirm("Voulez-vous vraiment supprimer ce commentaire ?");
      if (alert) {
        axios
          .delete("http://localhost:3000/api/comment/" + commentId, {
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
    axios
      .get("http://localhost:3000/api/comment/" + this.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.comments = res.data)); 

    axios
      //Je récupère l'id du post via l'url router.get du back(':id, userCtrl.getOnePost)
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
#onepost {
  background-color: rgb(214, 210, 210);
}

.return {
  text-align: right;
}

.return:hover {
  text-decoration: underline;
}

.container {
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 700px;
  margin: auto;
}

article {
  margin-top: 10px;
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border: 3px solid rgb(165, 59, 77);
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 3px 3px 5px black;
  border-radius: 15px;
}

h3 {
  text-align: left;
  margin-left: 60px;
}

.date_post {
  font-size: 0.8em;
  text-align: left;
}

.content_post {
  font-size: 18px;
  border: 2px solid rgb(246, 178, 178);
  border-radius: 12px;
  min-height: 140px;
  padding: 10px;
  text-align: justify;
}

.user_name_comment {
  margin-left: 10px;
  color: rgb(83, 83, 110);
  font-weight: bold;
  text-align: left;
  margin-bottom: 5px;
}

.name_comment {
  margin-left: 10px;
  color: rgb(83, 83, 110);
  font-weight: bold;
  text-align: left;
  margin-bottom: 5px;
}

.content_comment_user {
  background-color: rgb(248, 188, 188);
  border-radius: 10px;
  min-height: 20px;
  padding: 15px;
  margin-bottom: 25px;
  text-align: justify;
  box-shadow: 3px 3px 5px rgb(83, 83, 110);
}

.content_comment {
  background-color: rgb(233, 230, 230);
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
  font-size: 1.3em;
  margin-top: 33px;
  color: rgb(165, 59, 77);
  font-weight: bold;
  float: right;
  width: 35px;
  cursor: pointer;
}

.btn_delete_comment:hover {
  color: black;
  font-size: 1.4em;
}

h4 {
  text-align: left;
  margin-left: 5px;
  margin-bottom: 5px;
}

textarea {
  padding: 10px;
  min-height: 40px;
  margin-bottom: 20px;
  box-shadow: inset 3px 3px 5px rgb(83, 83, 110);
}

#btn_new_comment {
  padding: 10px 12px;
  border: 2px solid rgb(165, 59, 77);
  background-color: rgb(165, 59, 77);
  color: white;
  margin-top: 10px;
  margin-bottom: 200px;;
  max-width: 250px;
  cursor: pointer;
  transition-duration: 0.6s;
  font-size: 1em;
  box-shadow: 3px 3px 5px black;
}

#btn_new_comment:hover {
  background-color: rgb(165, 59, 77);
  color: white;
  box-shadow: inset 3px 3px 5px black;
}
</style>
