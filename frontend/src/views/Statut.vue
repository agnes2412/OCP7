<template>
  <div class="statut">
    <Header />
    <div class="container">
      <p class="return">
        <i class="fas fa-long-arrow-alt-left"></i>
        <a :href="'http://localhost:8080/#/admin/'">Retour</a>
      </p>

      <article class="statut_post">
        <p class="user_name">{{ user.name }}<br /></p>

        <div class="display_statut">
          <input
            @click="admin()"
            name="statut"
            type="radio"
            id="admin"
            value="Administrateur"
            v-model="userStatut"
            :checked="user.statut == 2"
          />

          <label for="admin">Administrateur</label>
        </div>
        <div class="display_statut">
          <input
            @click="accepted()"
            name="statut"
            type="radio"
            id="userAccepted"
            value="Utilisateur accepté"
            v-model="userStatut"
            :checked="user.statut == 0"
          />
          <label for="userWaiting">Utilisateur accepté</label>
        </div>

        <div class="display_statut">
          <input
            @click="blocked()"
            name="statut"
            type="radio"
            id="userBlocked"
            value="Utilisateur bloqué"
            v-model="userStatut"
            :checked="user.statut == 1"
          />
          <label for="userBlocked">Utilisateur bloqué</label>
        </div>

        <div class="statut_user">
          Statut de l'utilisateur {{ user.name }} : {{ user.statut }}
        </div>
        <button class="display_statut" v-if="statut == 2"
      @click="deleteAccountByAdmin()">Supprimer le compte utilisateur</button>
      </article>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Header from "@/components/Header.vue";
//const statut = sessionStorage.getItem("userStatut");

export default {
  //user: "",
  name: "Admin",
  components: {
    Header,
  },

  data() {
    return {
      //je récupère le statut du user
      userStatut: "",
      //Je récupère l'objet user
      user: {},
      //la variable id_user correspond au user de l'axios.get et axios.put et axios.delete
      id_user: this.$route.params.id,
      user_id: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  methods: {
    admin() {
      this.userStatut = 2;
      //J'appelle la fonction pour mettre à jour la base de données
      this.modify();
    },
    accepted() {
      this.userStatut = 0;
      this.modify();
    },
    blocked() {
      this.userStatut = 1;
      this.modify();
    },
    modify() {
      axios
        .put("http://localhost:3000/api/auth/moderate/" + this.id_user, {
          statut: this.userStatut,

          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => (this.userStatut = res.data)); //console.log(res);
      window.location.reload();
    },

    deleteAccountByAdmin() {
      axios
      .delete("http://localhost:3000/api/auth/moderate/" + this.id_user, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res));
      location.href = "http://localhost:8080/#/admin/";
      window.location.reload();
    },
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/auth/" + this.id_user, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      //La res user sert à afficher le statut et le name
      .then((res) => (this.user = res.data));
  },
};
</script>

<style scoped>

.statut {
  background-color: rgb(245, 234, 234);
  padding: 5px;;
}
.container {
  max-width: 600px;
  margin: auto;
  padding-bottom: 400px;
}
.user_name {
  text-align: left;
  margin-left: 15%;
  padding-bottom: 10px;
  margin-bottom: 35px;
  border-bottom: 1px solid rgb(241, 116, 116);
}

article {
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border: 1px solid lightgrey;
  border-top: 6px solid rgb(241, 116, 116);
  margin-top: 50px;
  min-height: 230px;
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 5px 10px 10px rgb(141, 117, 117);
}

.return {
  text-align: right;
}

.return:hover {
  text-decoration: underline;
}

.display_statut {
  display: flex;
  margin-left: 25%;
  margin-bottom: 20px;
}

label {
  margin-left: 10px;
}

.statut_user {
  margin-top: 50px;
  margin-left: 15%;
  margin-bottom: 20px;
  border-top: 1px solid #f4330d;
  padding-top: 10px;
  text-align: left;
}

button {
  padding: 7px;
  background-color: white;
  margin-top: 30px;
  transition-duration: 0.6s;
  font-size: 1em;
  width: 200px;
  box-shadow: 3px 3px 6px rgb(83, 83, 110);
  border: 3px solid rgb(83, 83, 110) ;
}

button:hover {
  background-color: rgb(83, 83, 110);
  box-shadow: none;
  color: white;
  cursor: pointer;
  box-shadow: inset 3px 3px 5px rgb(83, 83, 110);
}
</style>