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
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "CreatePost",
  components: {
    Header,
    Footer,
  },
  //data est un état local où se trouve mes variables
  //Ces variables vont récupérer les données entrées par les utilisateurs
  data() {
    return {
      title: "",
      content: "",
      //Récupération de l'UserId et de l'userStatut depuis la sessionStorage (stockage local des éléments de la session)
      userId: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  methods: {
    //axios permet de faire la requête HTTP post pour envoyer les données au backend
    newPost() {
      axios
        .post(
          "http://localhost:3000/api/posts/",
          {
            //Je récupère le titre et le contenu du post (c'est le corps de la requête)
            title: this.title,
            content: this.content,
            //Je fournis l'id du user associé au post (pour renseigner la clé étrangère UserId de la table post (dans le controleur))
            user_id: this.userId,
          },
          {
            //Récupération du token depuis la sessionStorage
            //Ce token est celui attribué à l'utilisateur pour l'authentification
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
 background-color: rgb(245, 239, 239);
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
  padding-bottom: 150px; 
}

article {
  margin: 80px 5px 0 5px;
  background-color: rgb(41, 45, 73);
  border: 3px solid white;
  padding:  5px;
  min-height: 320px;
  box-shadow: 3px 3px 5px black;
}

h3 {
  color: white;
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
  box-shadow: inset 3px 3px 5px black;
}

textarea {
  padding: 10px;
  min-height: 90px;
  margin-bottom: 50px;
  margin-top: 5px;
  border: none;
  box-shadow: inset 3px 3px 5px black;
}

button {
  padding: 7px;
  background-color: white;
  margin-bottom: 20px;
  transition-duration: 0.6s;
  font-size: 1em;
  width: 200px;
  box-shadow: 3px 3px 5px black;
  border:3px solid white;
  font-size: 1.2em;
}

button:hover {
  background-color: rgb(214, 210, 210);
  box-shadow: none;
  border: 3px solid white;
  cursor: pointer;
  box-shadow: inset 3px 3px 5px black;
}
</style>
