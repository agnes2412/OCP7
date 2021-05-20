<template>
  <div id="container">
    <img
      src="../assets/icon-left-font-monochrome-black.png"
      alt="Groupomania logo"
    />
    <form @submit.prevent="login()">
      <label for="login_name">Nom </label>
      <input
        id="login_name"
        type="text"
        placeholder="Votre nom"
        v-model="name"
        required
      />

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
</template>

<script>
import axios from "axios";

export default {
  name: "LoginPage",

  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    login() {
      axios
        .post(
          "http://localhost:3000/api/auth/login",
          {
            name: this.name,
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "token",
            },
          }
        )
        .then((res) => {
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

<style lang="scss">
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

label {
  text-align: left;
}
</style>
