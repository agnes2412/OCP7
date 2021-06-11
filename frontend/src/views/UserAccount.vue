<template>
  <div class="user_account">
    <Header />
    <p class="return">
      <i class="fas fa-long-arrow-alt-left"></i>
      <a :href="'http://localhost:8080/#/posts/'">Retour</a>
    </p>
    <h1>Bienvenue sur votre compte {{ user.name }}</h1>

    <form class="changeAccount" @submit.prevent="modifyAccount(user.id)">
      <p>Votre nom : {{ user.name }}</p>
      <input
        id="change_name"
        type="text"
        placeholder="Modifier votre nom..."
        v-model="newName"
      />
      <p>Votre email : {{ user.email }}</p>
      <input
        id="change_email"
        type="text"
        placeholder="Modifier votre email..."
        v-model="newEmail"
      /><br />

      <button id="btn_new_account" type="submit">Modifier</button>
      <button
        id="btn_delete_account"
        type="submit"
        v-if="statut == 1"
        @click="deleteAccount(user.id)"
      >
        Supprimer
      </button>
    </form>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";

export default {
  name: "UserAccount",
  components: {
    Header,
  },
  data() {
    return {
      user: [
        /*Récupération des users*/
      ],
      //newName: "",
      //newEmail: "",
      name: "",
      email: "",
      userId: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },
  methods: {
    //modifyAccount(userId) {
    //console.log()
    // axios
    //.put("http://localhost:3000/api/auth/user/" + userId, {
    // headers: {
    //  Authorization: "Bearer " + sessionStorage.getItem("token"),
    //},
    // })
    //.then((res) => console.log(res)); //(this.user = res.data)); //
    // },
    deleteAccount(userId) {
      axios
        .delete("http://localhost:3000/api/auth/" + userId, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => console.log(res))
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/auth/" + this.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.user = res.data)); //console.log(res));
  },
};
</script>
<style scoped>
.return {
  text-align: right;
  margin-right: 20px;
}
</style>
