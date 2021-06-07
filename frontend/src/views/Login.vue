<template>
  <div class="login">
    <div class="bloc-page">
      <div id="container">
        <img
          src="../assets/icon-left-font-monochrome-white.png"
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
      //if (statut == 1 || statut == 0) {
      axios
        .post("http://localhost:3000/api/auth/login", {
          email: this.email,
          password: this.password,
        })

        .then((res) => {
          console.log(res);
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
     // }
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 1em;
}
.bloc-page {
  background-color: #f4330d;
  opacity: 0.7;
  padding-bottom: 40px;
}

label {
  color: white;
  text-align: left;
}

#thanks_signup {
  font-size: 1.6em;
  color: white;
  margin-bottom: 30px;
}

form {
  display: flex;
  flex-direction: column;
}

button {
  margin-top: 10px;
  font-size: 1.2em;
  padding: 10px;
  max-width: 200px;
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
  padding: 10px;
  margin-bottom: 15px;
  margin-top: 5px;
}
</style>