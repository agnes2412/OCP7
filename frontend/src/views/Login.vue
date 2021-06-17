<template>
  <div class="login">
    <div class="container">
      <img
        src="../assets/icon-left-font-monochrome-white.png"
        alt="Groupomania logo"
      />

      <div id="thanks_signup">
        <h1>Bienvenue !</h1>
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
</template>

<script>
// @ is an alias to /src
import axios from "axios";
const statut = sessionStorage.getItem("userStatut");
//import router from 'vue-router';

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      msg: "Vous pouvez vous connecter ",
      statut: sessionStorage.getItem("userStatut"),
      user_id: sessionStorage.getItem("userId"),
    };
  },

  methods: {
    login() {
      //store.posts = this.name;
      //this.$router.push("posts");

      axios
        .post(
          "http://localhost:3000/api/auth/login",
          {
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        )
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
          if (statut == 0 || statut == 2) {
            location.href = "http://localhost:8080/#/posts";
          } else {
            alert("Votre compte a été bloqué, veuillez contacter l'administrateur");
            //sessionStorage.clear();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.login {
  background-color: rgb(83, 83, 110);
  padding: 10px;
}

.container {
  max-width: 600px;
  margin: auto;
  padding-bottom: 200px;
}

h1 {
  border-top: 6px solid rgb(241, 116, 116);

  margin-top: -100px;
  padding-top: 50px;

  color: white;
  font-size: 1.1em;
  text-align: left;
}

h2 {
  color: white;
  font-size: 0.9em;
  text-align: left;
}

label {
  text-align: left;
  color: white;
}

#thanks_signup {
  font-size: 1.6em;
  margin-bottom: 50px;
}

form {
  max-width: 600px;
  display: flex;
  flex-direction: column;
}

button {
  margin-top: 70px;
  font-size: 1.2em;
  padding: 13px;
  max-width: 200px;
  transition-duration: 0.6s;
  border: 2px solid rgb(83, 83, 110);
  background-color: white;
  box-shadow: 5px 5px 10px rgb(32, 32, 42);
}

button:hover {
  background-color: rgb(241, 116, 116);
  cursor: pointer;
  color: white;
  box-shadow: none;
  border: 2px solid white;
}

img {
  margin-top: -120px;
  width: 100%;
  max-width: 450px;
}

form input {
  border: none;
  box-shadow: inset 3px 3px 5px rgb(32, 32, 42);
  padding: 15px;
  margin-bottom: 15px;
  margin-top: 15px;
}
</style>