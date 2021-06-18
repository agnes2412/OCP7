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
          <!--<div class="fichier_image">
            <label for="upload_file">Charger l'image</label>
            <input type="file" id="upload_file" class="input_image" ref="image"
            @change="upload()"/>
          </div>-->

          <button id="btn_new_post" type="submit">Publier votre post</button>
        </form>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
//const statut = sessionStorage.getItem("userStatut");

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
      //image: null,
      userId: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
      postStatut: sessionStorage.getItem("postStatut"),
    };
  },
  
  methods: {
   // upload() {
       // this.image = this.$refs.image.files[0];
     // },

    newPost() {
      //const data = new FormData();
     // if(this.title !== null) {
        //data.append("title", this.title);
    //  } if (this.content !== null) {
        //data.append("content", this.content);
     // } if (this.image !== null) {
        //data.append("image", this.image);
     // }
      console.log(this.title);
      //console.log(this.image);
      axios
      
        .post(
          "http://localhost:3000/api/posts/", //data,
          {
            //Je récupère le titre et le contenu du post
            title: this.title,
            content: this.content,
            //image: this.image,
            //Je fournis la clé étrangère associé au post (renseignée dans le controleur posts create.post)
            user_id: this.userId,
         },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((res) => console.log(res));
      console.log("Votre post est crée !");
      location.href = "http://localhost:8080/#/posts";
      window.location.reload();

      // sessionStorage.setItem("postStatut", res.data.postStatut);
      //if(postStatut == 1) {
      //location.href = "http://localhost:8080/#/posts";

      //console.log(res.data.postStatut);
      //window.location.reload()
      // }
    },
  },
};
</script>

<style scoped>
.create_post {
  background-color: rgb(245, 234, 234);
  padding-bottom: 400px;
}
.return {
  text-align: right;
  margin-right: 20px;
}

.return:hover {
  text-decoration: underline;
}

.container_new_post {
  max-width: 800px;
  margin: auto;
}
article {
  margin-top: 80px;
  background-color: rgb(169, 169, 185);
  border-top: 6px solid rgb(83, 83, 110);
  padding: 5px;
  min-height: 320px;
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
  border: none;
  box-shadow: inset 3px 3px 5px rgb(83, 83, 110);
}

textarea {
  padding: 10px;
  min-height: 90px;
  margin-bottom: 50px;
  margin-top: 5px;
  border: none;
  box-shadow: inset 3px 3px 5px rgb(83, 83, 110);
}

button {
  padding: 7px;
  background-color: white;
  margin-top: -20px;
  transition-duration: 0.6s;
  font-size: 1em;
  width: 200px;
  box-shadow: 3px 3px 6px rgb(83, 83, 110);
  border: none;
  font-size: 1.2em;
}

button:hover {
  background-color: rgb(83, 83, 110);
  box-shadow: none;
  color: white;
  cursor: pointer;
  box-shadow: inset 3px 3px 5px rgb(83, 83, 110);
}
</style>
