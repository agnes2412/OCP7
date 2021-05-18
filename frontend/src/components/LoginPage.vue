<template>
  <div id="container">
    <img
      src="../assets/icon-left-font-monochrome-black.png"
      alt="Groupomania logo"
    />
    <form @submit.prevent="login()">
      <label for="login_name">Nom </label>
      <input id="login_name" type="text" placeholder="Votre nom" required />

      <label for="login_email">Email :</label>
      <input id="login_email" type="email" placeholder="Votre email" required />

      <label for="login_password">Mot de passe :</label>
      <input
        id="login_password"
        type="password"
        placeholder="Votre mot de passe"
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
      axios.post("http://localhost:3000/api/auth/login", {
          name: this.name,
          email: this.email,
          password: this.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        })
        .then((res) => {
          sessionStorage.setItem('token', res.data.token);
          sessionStorage.setItem('userId', res.data.userId);
          console.log(res.data.token);
          //location.reload();
          location.href ='http://localhost:8080/#/posts';
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>