<template>
  <div class="login">
    <div class="bloc-page">
      <div id="container">
        <img
          src="../assets/icon-left-font-monochrome-black.png"
          alt="Groupomania logo"
        />

        <div id="thanks_signup">
          <h2>{{ msg }}</h2>
        </div>
        <form @submit.prevent="login()">
          <label for="login_email">Email :</label>
          <input
            id="login_email"
            type="email"
            placeholder="Votre email"
            v-model="email"
            required
          />

          <label for="login_password">Mot de passe :</label>
          <input
            id="login_password"
            type="password"
            placeholder="Votre mot de passe"
            v-model="password"
            required
          />

          <button id="login_btn" type="submit">Se connecter</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
//const statut = sessionStorage.getItem("userStatut");
//import router from 'vue-router';

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      msg: "Bienvenue, vous pouvez vous connecter !",
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  methods: {
    login() {
      //store.posts = this.name;
      //this.$router.push("posts");

      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })

        .then((res) => {
          console.log(res);
          //J'ajoute l'id du User (récupéré dans la réponse) dans le sessionStorage
          sessionStorage.setItem("userId", res.data.userId);
          sessionStorage.setItem("userStatut", res.data.userStatut);
          console.log(res.data.userId);
          console.log(res.data.userName);
          sessionStorage.setItem("token", res.data.token);
          console.log(res.data.token);
          console.log(res.data.userStatut);
          //this.$router.push("/users/groupomania");
          location.href = "http://localhost:8080/#/posts";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 1em;
  text-align: left;
}
.bloc-page {
  padding-bottom: 150px;
}

label {
  text-align: left;
}

#thanks_signup {
  font-size: 1.6em;
  margin-bottom: 50px;
}

form {
  display: flex;
  flex-direction: column;
}

button {
  margin-top: 30px;
  font-size: 1.2em;
  padding: 13px;
  max-width: 200px;
  border-radius: 15px;
  transition-duration: 0.6s;
  border: 2px solid rgb(141, 117, 117);
  background-color: white;
  box-shadow: 5px 5px 10px rgb(141, 117, 117);
}

button:hover {
  background-color: rgb(95, 78, 78);
  color: white;
  box-shadow: none;
  border: 2px solid rgb(95, 78, 78);
}

img {
  width: 100%;
  max-width: 450px;
}

#container {
  max-width: 600px;
  margin: auto;
}

form input {
  border: 2px solid rgb(141, 117, 117);
  padding: 15px;
  margin-bottom: 15px;
  margin-top: 5px;
}
</style>