<template>
  <div class="one_post">
    <Header />
    <div class="container_one_post">
      <p class="return">
        <i class="fas fa-long-arrow-alt-left"></i>
        <a :href="'http://localhost:8080/#/posts/'">Retour</a>
      </p>
      <article>
        <!--<button class="btn_delete_post"
          v-if="userId == post.UserId"
          @click="deletepost()"
        >X</button
        >-->
        <h3>{{ post.title }}</h3>
        <div class="content_post">
          {{ post.content }}
        </div>
        <p class="date_post">
          Post publié le
          {{ moment(post.createdAt).format("DD/MM/YY à H: mm") }} par {{  }}
          <span
            class="btn_modify_post"
            v-if="userId == post.UserId"
            @click="modifyPost()"
            >Modifier votre post
          </span>
        </p>
      </article>

      <div class="one_comment" v-for="comment in comments" :key="comment.id">
        <!-- Seuls les statuts admin et le user associé à la clé étrangère 'UserId' du comment peuvent le supprimer-->
        <button
          class="btn_delete_comment"
          v-if="statut == 1 || userId == comment.UserId"
          @click="deleteComment(comment.id)"
        >
          X
        </button>
        <div class="content_comment">
          {{ comment.User.name }} <br />
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
      content: "",
      moment: moment,
      posts: [],
      users: [],
      post: {},
      comments: [],
      //segment dynamique pour afficher le post d'un user
      id: this.$route.params.id,
      userId: sessionStorage.getItem("userId"),
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
            user_id: this.userId,
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
.one_posts {
  background-color: rgb(226, 225, 230);
}

.container_one_post {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  max-width: 600px;
  margin: auto;
}

.return {
  text-align: right;
  margin-right: 20px;
}

.return:hover {
text-decoration:underline;
}

article {
  margin-top: 50px;
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border-top: 6px solid rgb(141, 117, 117);
  min-height: 230px;
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 5px 10px 10px rgb(141, 117, 117);
}

.date_post {
  font-size: 0.8em;
  text-align: left;
}

.content_post {
  border-bottom: 1px solid #f4330d;
  border-top: 2px solid #f4330d;
  min-height: 140px;
  padding-top: 10px;
  text-align: left;
}

.btn_modify_post {
  padding: 7px 10px;
  border: 1px solid rgb(141, 117, 117);
  background-color: white;
  border-radius: 10px;
  float: right;
  margin-top: -8px;
  transition-duration: 0.6s;
  font-size: 1.2em;
  cursor: pointer;
  box-shadow: 5px 5px 10px rgb(141, 117, 117);
}

.btn_modify_post:hover {
  background-color: rgb(141, 117, 117);
  color: white;
  box-shadow: none;
}
.content_comment {
  background-color: rgb(245, 239, 239);
  border-radius: 10px;
  min-height: 40px;
  padding: 10px 10px;
  text-align: left;
  margin-bottom: 15px;
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
  margin-top: 10px;
  color: #f4330d;
  border: none;
  font-weight: bold;
  width: 35px;
  box-shadow: none;
  background-color: rgb(245, 239, 239);
}

.btn_delete_comment:hover {
  background-color: red;
  color: white;
}

textarea {
  padding: 10px;
  min-height: 40px;
  margin-bottom: 20px;
}

button {
  padding: 10px 12px;
  border: 2px solid rgb(141, 117, 117);
  background-color: white;
  border-radius: 10px;
  margin-top: 10px;
  float: right;
  transition-duration: 0.6s;
  font-size: 0.9em;
  max-width: 200px;
  cursor: pointer;
  box-shadow: 5px 5px 10px rgb(141, 117, 117);
}

button:hover {
  background-color: rgb(141, 117, 117);
  color: white;
  box-shadow: none;
}
</style>
