<template>
  <div class="statut">
    <Header />
    <article class="statut_post">
      <p class="user_name">{{ user.name }}<br /></p>

      <div class="display_statut">
        <input
          @click="refused(user.id)"
          type="radio"
          id="1"
          value="Utilisateur refusé"
          v-model="Userstatut"
        />

        <label for="userRefused">Utilisateur refusé</label>
      </div>
      <div class="display_statut">
        <input
          @click="accepted(user.id)"
          type="radio"
          id="userAccepted"
          value="Utilisateur accepté"
          v-model="Userstatut"
        />
        <label for="userAccepted">Utilisateur accepté</label>
      </div>

      <div class="display_statut">
        <input
          @click="admin(user.id)"
          type="radio"
          id="userAdmin"
          value="Administrateur"
          v-model="Userstatut"
        />
        <label for="userAdmin">Administrateur</label>
      </div>

      <div class="statut_user">Statut de l'utilisateur : {{ Userstatut }}</div>

      <i class="fas fa-long-arrow-alt-left"></i>
      <a :href="'http://localhost:8080/#/Admin/'">Retour</a>
    </article>
  </div>
</template>


<script>
import axios from "axios";
import Header from "@/components/Header.vue";
const statut = sessionStorage.getItem("userStatut");

export default {
  user: "",
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
      console.log(statut);
      statut === 2;
    },
    accepted() {
      console.log(statut);
      statut === 0;
    },
    admin() {
      statut === 1;
    },
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/auth/" + this.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.user = res.data)); //console.log(res));//
  },
};
</script>

<style scoped>
.display_statut {
  display: flex;
  margin-left: 30px;
  margin-bottom: 20px;
}

label {
  margin-left: 10px;
}

.statut_user {
  margin-top: 30px;
  margin-left: 30px;
  margin-bottom: 50px;
  text-align: left;
}


</style>