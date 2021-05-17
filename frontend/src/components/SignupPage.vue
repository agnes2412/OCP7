<template>
  <div id="container">
    <img
      src="../assets/icon-left-font-monochrome-black.png"
      alt="Groupomania logo"
    />
    <form @submit.prevent="signup()">
      <label for="name">Nom </label>
      <input
        id="name"
        type="text"
        placeholder="Votre nom"
        v-model="name"
        required
      />

      <label for="email">Email </label>
      <input
        id="email"
        type="email"
        placeholder="Votre email"
        v-model="email"
        required
      />

      <label for="password">Mot de passe </label>
      <input
        id="password"
        type="password"
        placeholder="Votre mot de passe"
        v-model="password"
        required
      />
      <button id="btn" type="submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
//import router from '../router/index'

export default {
  name: "SignupPage",

  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    signup() {
      axios.post("http://localhost:3000/api/auth/signup", {
          name: this.name,
          email: this.email,
          password: this.password,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          localStorage.setItem('users', JSON.stringify(res.data));
          //router.push({ name: "Posts"});
          location.href('./Posts')
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
