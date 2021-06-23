<template>
  <div id="admin">
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
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";

export default {
  name: "Admin",
  components: {
    Header,
  },

  data() {
    return {
      users: [],
      user_id: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
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
#admin {
  background-color: rgb(214, 210, 210);
  padding: 5px;
}

.container {
  max-width: 500px;
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
  border-top: 6px solid rgb(165, 59, 77);
  min-height: 100px;
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 3px 3px 5px black;
}
.user_name {
  text-align: left;
  margin-left: 60px;
  margin-top: 20px;
}

.display_statut {
  padding: 10px 12px;
  border: 2px solid rgb(165, 59, 77);
  background-color: rgb(165, 59, 77);
  color: white;
  border: 3px solid rgb(165, 59, 77);
  box-shadow: 3px 3px 5px black;
  border-radius: 10px;
  float: right;
  transition-duration: 0.6s;
  font-size: 0.9em;
  max-width: 200px;
  cursor: pointer;
  margin-top: -10px;
}

.display_statut:hover {
  color: rgb(165, 59, 77);
  background-color: white;
  border: 3px solid rgb(165, 59, 77);
  box-shadow: inset 3px 3px 5px black;
}
</style>

