<template>
  <div class="statut">
    <Header />
    <article class="one_post" v-for="user in users" :key="user.id">
      <p class="user_name">{{ user.name }}</p>
      <input
        type="radio"
        id="userRefused"
        value="Utilisateur refusé"
        v-model="picked"
      />

      <label for="userRefused">Utilisateur refusé</label>
      <br />
      <input
        type="radio"
        id="userAccepted"
        value="Utilisateur accepté"
        v-model="picked"
      />
      <label for="userAccepted">Utilisateur accepté</label>
      <br />

      <input
        type="radio"
        id="userAdmin"
        value="Administrateur"
        v-model="picked"
      />
      <label for="userAdmin">Administrateur</label>
      <br />

      <span>Statut de l'utilisateur : {{ picked }}</span>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
//const userAdmin = 1;
//const userRefused = 2;
//const userAccepted = 0;

export default {
  users: "",
  name: "Admin",
  components: {
    Header,
  },

  data() {
    return {
      users: [],
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  methods: {},

  mounted() {
    axios
      .get("http://localhost:3000/api/auth/", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.users = res.data));
  },
};
</script>

