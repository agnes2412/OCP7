<template>
  <div class="statut">
    <Header />
    <article
      class="one_post"
      v-for="user in users"
      :key="user.id"
      v-bind:id="user.id"
    >
      <p class="user_name">
        {{ user.name }}<br /><a :href='"http://localhost:8080/#/Statut/" + user.id'>
          Voir le statut
        </a>
      </p>
      <!--<div v-if="isDisplay">
        <div class="display_statut">
          <input
            @click="refused(user.id)"
            type="radio"
            id="1"
            value="Utilisateur refusé"
            v-model="Userstatut"
          />

          <label for="userRefused">Utilisateur refusé</label>
          <br />
          <input
            @click="accepted(user.id)"
            type="radio"
            id="userAccepted"
            value="Utilisateur accepté"
            v-model="Userstatut"
          />
          <label for="userAccepted">Utilisateur accepté</label>
          <br />

          <input
            @click="admin(user.id)"
            type="radio"
            id="userAdmin"
            value="Administrateur"
            v-model="Userstatut"
          />
          <label for="userAdmin">Administrateur</label>

          <br />

          <span>Statut de l'utilisateur : {{ Userstatut }}</span>
        </div>
        <button @click="hideStatut()">Cacher le statut</button>
      </div>-->
    </article>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
const statut = sessionStorage.getItem("userStatut");

export default {
  users: "",
  name: "Admin",
  components: {
    Header,
  },

  data() {
    return {
      isDisplay: false,
      Userstatut: "",
      users: [],
      user: "",
      id: this.$route.params.id,
      userId: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  methods: {
    //showStatut() {
      //this.isDisplay = true;
    //},
    //hideStatut() {
      //this.isDisplay = false;
    //},

    refused() {
      console.log("statut");
      statut === 2;
    },
    accepted() {
      statut === 0;
    },
    admin() {
      statut === 1;
    },
  },

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

<style scoped>
.user_name {
  text-align: left;
}
</style>

