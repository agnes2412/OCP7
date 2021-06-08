<template>
  <div class="statut">
    <Header />
    <p class="return">
      <i class="fas fa-long-arrow-alt-left"></i>
      <a :href="'http://localhost:8080/#/Admin/'">Retour</a>
    </p>

    <article class="statut_post">
      <p class="user_name">{{ user.name }}<br /></p>

      <div class="display_statut">
        <input
          @click="refused()"
          name="statut"
          type="radio"
          id="userRefused"
          value="Utilisateur refusé"
          v-model="userStatut"
          :checked="user.statut == 2"
        />

        <label for="userRefused">Utilisateur refusé</label>
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
        <label for="userAccepted">Utilisateur accepté</label>
      </div>

      <div class="display_statut">
        <input
          @click="admin()"
          name="statut"
          type="radio"
          id="userAdmin"
          value="Administrateur"
          v-model="userStatut"
          :checked="user.statut == 1"
        />
        <label for="userAdmin">Administrateur</label>
      </div>

      <div class="statut_user">
        Statut de l'utilisateur {{ user.name }} : {{ user.statut }}
      </div>
    </article>
  </div>
</template>


<script>
import axios from "axios";
import Header from "@/components/Header.vue";
//const statut = sessionStorage.getItem("userStatut");

export default {
  user: "",
  name: "Admin",
  components: {
    Header,
  },

  data() {
    return {
      userStatut: "",
      user: [],
      id: this.$route.params.id,
      userId: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },

  methods: {
    refused() {
      //console.log(statut);
      //Je mets la valeur 2 dans le userStatut qui sera refusé
      this.userStatut = 2;
      //J'appelle la fonction pour mettre à jour la base de données
      this.modify();
    },
    accepted() {
      //console.log(statut);
      //Je mets la valeur 2 pour le userStatut qui sera accepté
      this.userStatut = 0;
      this.modify();
    },
    admin() {
      //console.log(statut);
      //Je mets la valeur 2 pour le userStatut qui sera admin
      this.userStatut = 1;
      this.modify();
    },
    modify() {
      axios
        .put("http://localhost:3000/api/auth/moderate/" + this.id, {
          statut: this.userStatut,

          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => (this.user = res.data)); //console.log(res);
    },
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/auth/" + this.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.user = res.data)); //console.log(res.data.statut));//
  },
};
</script>

<style scoped>
.user_name {
  text-align: left;
  margin-left: 15%;
  padding-bottom: 10px;
  margin-bottom: 35px;
  border-bottom: 1px solid #f4330d;
}

article {
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 60px;
  background-color: white;
  border: 1px solid lightgrey;
  border-top: 6px solid rgb(141, 117, 117);
  min-height: 230px;
  max-width: 600px;
  margin: auto;
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 5px 10px 10px rgb(141, 117, 117);
}

.return {
  text-align: right;
  margin-right: 20px;
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
</style>