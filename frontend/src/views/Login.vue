<template>
  <div id="login">
    <div class="container">
      <img
        src="../assets/icon-left-font-monochrome-white.png"
        alt="Groupomania logo"
      />

      <div class="deco"></div>
      

      <form @submit.prevent="login()">
        <p>Bienvenue !<br> Vous pouvez vous connecter !</p>
        <label for="login_email">Email :</label>
        <input
          id="login_email"
          name="email"
          autocomplete="username"
          type="email"
          placeholder="Votre email"
          v-model="email"
          required
        />

        <label for="login_password">Mot de passe :</label>
        <input
          id="login_password"
          name="password"
          type="password"
          placeholder="Votre mot de passe"
          autocomplete="current-password"
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

export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      statut: sessionStorage.getItem("userStatut"),
      user_id: sessionStorage.getItem("userId"),
    };
  },

  methods: {
    login() {
      //Je récupère les données de l'utilisateur dans les champs du formulaire d'inscription
      //Je fais ma requête à l'API avec axios en utilisant la méthode post et l'url correspondant au login pour passer les informations dans le corps de la requête
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
          sessionStorage.setItem("token", res.data.token);
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
#login {
  background-color: rgb(41, 45, 73);
  padding: 5px;
}
.deco {
  width: 90%;
  margin-top: -140px;
  margin-bottom: 100px;
  border-bottom: 5px solid rgb(165, 59, 77);
}

.container {
  padding-bottom: 200px;
}

p {
  text-align: left;
  padding-bottom: 10px;
  font-size: 1.4em;
  color: rgb(41, 45, 73);
  font-weight: bold;
}

label {
  text-align: left;
  color: rgb(31, 31, 70);
}

form {
  background-color: rgb(233, 231, 231);
  padding: 0px 10px 30px 10px;
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 3px 3px 5px black;
}

button {
  margin-top: 30px;
  font-size: 1.2em;
  padding: 10px;
  max-width: 180px;
  transition-duration: 0.6s;
  border: 2px solid rgb(41, 45, 73);
  background-color: rgb(41, 45, 73);
  color: white;
  box-shadow: 3px 3px 5px black;
}

button:hover {
  background-color: white;
  cursor: pointer;
  color: rgb(41, 45, 73);
  font-weight: bold;
  box-shadow: none;
  border: 2px solid rgb(41, 45, 73);
  box-shadow: inset 3px 3px 5px black;
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
  margin-bottom: 30px;
  margin-top: 5px;
}
</style>