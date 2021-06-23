<template>
  <div id="signup">
    <div id="container">
      <img
        src="../assets/icon-left-font-monochrome-black.png"
        alt="Groupomania logo"
      />
      <form @submit.prevent="signup()">
        <h1>Inscription</h1>
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
        <input id="email" type="email" placeholder="Votre email" v-model="email" required />

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
  </div>
</template>

<script>
import axios from "axios";
// @ is an alias to /src

export default {
  name: "Signup",
  components: {},
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    signup() {
      if (this.email.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
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
            console.log("Votre compte est crée !");
            location.href = "http://localhost:8080/#/login";
          })
          .catch((error) => {
            console.log(error);
            alert("Cette adresse mail est déjà utilisée !");
          });
      } else {
        alert("Votre email n'est pas valide !");
      }
    },
  },
};
</script>

<style scoped>
#signup {
  background-color: rgb(238, 236, 236);
  padding: 10px;
}

label {
  text-align: left;
}

form {
  background-color: rgb(172, 73, 81);
  margin-top: -90px;
  display: flex;
  flex-direction: column;
  border: 3px solid white;
  padding: 30px;
  box-shadow: 3px 3px 5px grey;
  color: white;
}

h1 {
  margin-bottom: 50px;
  font-size: 1.4em;
}

label {
  text-align: left;
}

button {
  margin-top: 30px;
  font-size: 1.1em;
  padding: 10px;
  max-width: 180px;
  transition-duration: 0.6s;
  border: 2px solid grey;
  background-color: white;
  box-shadow: 3px 3px 5px black;
}

button:hover {
  background-color: rgb(187, 77, 77);
  color: white;
  box-shadow: none;
  border: 2px solid white;
  cursor: pointer;
}

img {
  margin-top: -120px;
  width: 100%;
  max-width: 450px;
}

#container {
  max-width: 600px;
  margin: auto;
  padding-bottom: 200px;
}

form input {
  box-shadow: inset 1px 1px 3px black;
  padding: 15px;
  margin-bottom: 30px;
  margin-top: 5px;
}
</style>