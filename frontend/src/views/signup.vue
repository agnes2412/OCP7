<template>
  <div class="signup">
    <div id="bloc-page">
      <div id="container">
        <img
          src="../assets/icon-left-font-monochrome-black.png"
          alt="Groupomania logo"
        />
        <form @submit.prevent="signup()">
          <label for="name">Nom </label>
          <!--la valeur donnée à v-model se synchronise avec la valeur donnée dans data-->
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
          <div class="btn">
            <button id="btn" type="submit">S'inscrire</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src
//import SignupPage from '@/components/SignupPage.vue';
export default {
  name: "Signup",
  components: {
    //SignupPage,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    signup() {
      axios
        .post(
          "http://localhost:3000/api/auth/signup",
          {
            name: this.name,
            email: this.email,
            password: this.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then(() => {
          alert("Votre compte est crée !");
          location.href = "http://localhost:8080/#/login";
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#bloc-page {
  background-color: rgb(233, 230, 222);
  padding-bottom: 50px;
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

label {
  text-align: left;
}
</style>