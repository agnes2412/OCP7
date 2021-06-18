<template>
  <div class="admin">
    <Header />
    <div class="container">
      <p class="return">
        <i class="fas fa-long-arrow-alt-left"></i>
        <a :href="'http://localhost:8080/#/posts/'">Retour</a>
      </p>
      <article
        class="one_post"
        v-for="user in users"
        :key="user.id"
        v-bind:id="user.id"
      >
        <p class="user_name">Nom de l'utilisateur : {{ user.name }}</p>
        <a :href="'http://localhost:8080/#/Statut/' + user.id"
          ><p class="display_statut">Voir le statut</p></a
        >

       

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
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
//const statut = sessionStorage.getItem("userStatut");

export default {
  users: "",
  name: "Admin",
  components: {
    Header,
  },

  data() {
    return {
      //isDisplay: false,
      //Userstatut: "",
      users: [],
      //user: [],
      //id: this.$route.params.id,
      user_id: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  methods: {
    //deleteAccountByAdmin() {
      //axios
      //.delete("http://localhost:3000/api/auth/moderate/" + this.id, {
        //headers: {
          //Authorization: "Bearer " + sessionStorage.getItem("token"),
       // },
      //})
      //.then((res) => console.log(res));
    //},
  //showStatut() {
  //this.isDisplay = true;
  //},
  //hideStatut() {
  //this.isDisplay = false;
  //},
  //refused() {
  // console.log("statut");
  // statut == 2;
  //},
  //accepted() {
  //statut == 0;
  // },
  //admin() {
  //statut == 1;
  // },
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
.admin {
  background-color: rgb(245, 234, 234);
  padding: 5px;
}

.container {
  max-width: 700px;
  margin: auto;
}

.return {
  text-align: right;
}

.return:hover {
  text-decoration: underline;
}

article {
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border: 1px solid lightgrey;
  border-top: 6px solid rgb(241, 116, 116);
  min-height: 100px;
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 3px 3px 5px rgb(105, 50, 50);
}
.user_name {
  text-align: left;
  margin-left: 60px;
  margin-top: 20px;
}

.display_statut {
  padding: 10px 12px;
  border: 2px solid rgb(83, 83, 110);
  background-color: white;
  border-radius: 10px;
  float: right;
  transition-duration: 0.6s;
  font-size: 0.9em;
  max-width: 200px;
  cursor: pointer;
  margin-top: -10px;
}

.display_statut:hover {
  color: white;
   background-color: rgb(83, 83, 110);
}
</style>

