<template>
  <div id="user_account">
    <Header />
    <div class="container">
      <p class="return">
        <i class="fas fa-long-arrow-alt-left"></i>
        <a :href="'http://localhost:8080/#/posts/'">Retour</a>
      </p>
      <div class="border">
        <div class="article">
          <h2>Votre compte {{ user.name }}</h2>

          <p>Votre nom : {{ user.name }}</p>

          <p>Votre email : {{ user.email }}</p>

          <div
            id="btn_delete_account"
            type="submit"
            v-if="user.statut == 0"
            @click="deleteAccount()"
          >
            Supprimer votre compte
          </div>
        </div>
      </div>
    </div>
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
      user: [],
      user_id: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },
  methods: {
    deleteAccount() {
      let alert = confirm(
        "Voulez-vous vraiment supprimer votre compte utilisateur ?"
      );
      if (alert) {
        axios
          .delete("http://localhost:3000/api/auth/" + this.user_id, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
          .then((res) => console.log(res));
        window.location.reload();
        location.href = "http://localhost:8080";
      }
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/auth/" + this.user_id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.user = res.data));
  },
};
</script>

<style scoped>
#user_account {
  background-color: rgb(245, 239, 239);
  padding-bottom: 400px;
}

.return {
  text-align: right;
  margin: 30px 5px 80px 0;
}

.return:hover {
  text-decoration: underline;
}

.container {
  max-width: 600px;
  margin: auto;
}

.article {
  font-size: 1.2em;
  max-width: 300px;
  margin: auto;
  padding: 5px;
  color: white;
  text-align: left;
  margin-bottom: 20px;
}

.border {
  background-color: rgb(165, 59, 77);
  max-width: 600px;
  margin: auto;
  box-shadow: 3px 3px 5px black;
  margin: 5px;
}

h2 {
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: left;
  font-size: 1.3em;
}

#btn_delete_account {
  color: rgb(165, 59, 77);
  text-align: center;
  font-weight: bold;
  margin-top: 80px;
  margin-bottom: 40px;
  font-size: 1em;
  padding: 10px;
  width: 90%;
  transition-duration: 0.6s;
  border: 2px solid white;
  background-color: white;
  box-shadow: 3px 3px 5px black;
  cursor: pointer;
}

#btn_delete_account:hover {
  background-color: rgb(165, 59, 77);
  color: white;
  box-shadow: inset 3px 3px 5px black;
  border: 2px solid white;
}
</style>
