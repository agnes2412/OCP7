<template>
  <div id="statut">
    <Header />
    <div class="container">
      <p class="return">
        <a :href="'http://localhost:8080/#/admin/'">Retour</a>
      </p>

      <article>
        <p class="user_name">{{ user.name }}<br /></p>
        <!--la valeur donnée à v-model se synchronise avec la valeur donnée dans data-->
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
        <button v-if="statut == 2" @click="deleteAccountByAdmin()">
          Supprimer le compte de {{ user.name }}
        </button>
      </article>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import Header from "@/components/Header.vue";
//const statut = sessionStorage.getItem("userStatut");

export default {
  name: "Admin",
  components: {
    Header,
  },

  data() {
    return {
      //Je récupère le statut du user
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
    accepted() {
      this.userStatut = 0;
      this.modify();
    },
    blocked() {
      this.userStatut = 1;
      this.modify();
    },

    modify() {
      //console.log(this.id_user);
      axios
        .put("http://localhost:3000/api/auth/moderate/" + this.id_user, {
          statut: this.userStatut},
          {

          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
          
        })
        
        .then(res => {
          this.userStatut = res.data;
          
          // window.location.reload();
        });
    },

    deleteAccountByAdmin() {
      let alert = confirm(
        "Voulez-vous vraiment supprimer le compte de cet utilisateur ?"
      );
      if (alert) {
        axios
          .delete("http://localhost:3000/api/auth/moderate/" + this.id_user, {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          })
          .then((res) => console.log(res));
        location.href = "http://localhost:8080/#/admin/";
        //window.location.reload();
      }
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
#statut {
  background-color: rgb(245, 239, 239);
  padding-bottom: 300px;
}

.container {
  max-width: 600px;
  margin: auto;
  padding: 5px;
}

.user_name {
  text-align: left;
  color: rgb(41, 45, 73);
  font-size: 1.2em;
  font-weight: bold;
  margin-left: 20%;
  margin-bottom: 60px;
}

article {
  background-image: url("../assets/icon.png");
  background-repeat: no-repeat;
  background-position: top-left;
  background-size: 80px;
  background-color: white;
  border: 3px solid rgb(41, 45, 73);
  font-size: 1.1em;
  margin-top: 50px;
  min-height: 230px;
  padding: 5px;
  margin-bottom: 30px;
  box-shadow: 3px 3px 5px black;
}

.return {
  text-align: right;
  margin-right: 5px;
}

.return:hover {
  text-decoration: underline;
}

.display_statut {
  display: flex;
  margin-left: 5%;
  margin-bottom: 20px;
}

label {
  margin-left: 10px;
}

.statut_user {
  margin-top: 40px;
  margin-left: 5%;
  margin-bottom: 20px;
  border-top: 2px solid rgb(41, 45, 73);
  padding-top: 10px;
  text-align: left;
}

button {
  padding: 9px;
  background-color: rgb(41, 45, 73);
  color: white;
  margin-top: 50px;
  margin-bottom: 30px;
  transition-duration: 0.6s;
  font-size: 1em;
  width: 90%;
  box-shadow: 3px 3px 5px black;
  border: 2px solid rgb(41, 45, 73);
}

button:hover {
  background-color: white;
  box-shadow: none;
  color: rgb(41, 45, 73);
  cursor: pointer;
  box-shadow: inset 3px 3px 5px black;
}
</style>