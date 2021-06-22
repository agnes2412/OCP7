<template>
  <div id="create_post">
    <Header />
    <div class="container_new_post">
      <p class="return">
        <i class="fas fa-long-arrow-alt-left"></i>
        <a :href="'http://localhost:8080/#/posts/'">Retour</a>
      </p>
      <article>
        <h3>Votre post</h3> 
        <!--la valeur donnée à v-model se synchronise avec la valeur donnée dans data-->
        <form class="new_post" @submit.prevent="newPost()">
           <input
            id="title_new_post"
            type="text"
            placeholder="Votre titre..."
            v-model="title"
            required
          />
          <label for="title_new_post"></label>
          
          
         <textarea
            id="content_new_post"
            placeholder="Votre contenu..."
            v-model="content"
          ></textarea>

          <button id="btn_new_post" type="submit">Publier votre post</button>
        </form>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";

export default {
  props: ["langs", "id", "height", "name"],
  name: "CreatePost",
  components: {
    Header,
  },
  //??data est une fonction qui va récupérer les posts + titre + contenu entrés par l'utilisateur avec la méthode d'axios
  //axios (requête HTTP)
  //data est un état local pour la page qui va changer selon les posts
  data() {
    return {
      title: "",
      content: "",
      //??sessionStorage.getItem récupère ici l'id' userId et userStatut
      userId: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  methods: {
    //permet de faire la requête pour envoyer les données rempli par l'utilisateur au backend
    newPost() {
      axios
        .post(
          "http://localhost:3000/api/posts/",
          {
            //Je récupère le titre et le contenu du post (c'est le corps de la requête)
            title: this.title,
            content: this.content,
            //??Je fournis l'id du user associé au post (pour renseigner la clé étrangère UserId de la table post)
            user_id: this.userId,
          },
          {
            //?? Récupération du token depuis la sessionstorage correspondant au user pour l'authentification
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        //Si la requête fonctionne, récupèration de la réponse du back (Post créé !)
        .then((res) => {
          console.log(res);
          location.href = "http://localhost:8080/#/posts";
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
#create_post {
  background-color: rgb(245, 234, 234);
  padding-bottom: 400px;
}

.return {
  text-align: right;
  margin-right: 20px;
  margin-top: 20px;
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
  border: 3px solid white;
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
  margin-bottom: 20px;
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
