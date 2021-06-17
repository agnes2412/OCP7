<template>
  <div class="user_account">
    <Header />
  <div class="container">
    <p class="return">
      <i class="fas fa-long-arrow-alt-left"></i>
      <a :href="'http://localhost:8080/#/posts/'">Retour</a>
    </p>
    <h2>Bienvenue sur votre compte {{ user.name }}</h2>

    <!--<form class="changeAccount" @submit.prevent="modifyAccount()">-->
      <p>Votre nom : {{ user.name }}</p>
      
      <p>Votre email : {{ user.email }}</p>
    
    <a :href="'http://localhost:8080'"><div
      id="btn_delete_account"
      type="submit"
      v-if="user.statut == 0"
      @click="deleteAccount()"
    >
      Supprimer votre compte
    </div></a>
    <!--</form>-->
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
      id: this.$route.params.id,
      name: "",
      email: "",
      user_id: sessionStorage.getItem("userId"),
      statut: sessionStorage.getItem("userStatut"),
    };
  },
  methods: {
    //modifyAccount() {
     // console.log(this.name);
      //console.log(this.email);
     // console.log(this.user);
      //axios
        //.put(
          //"http://localhost:3000/api/auth/" + this.user_id,
          //{
           // name: this.name,
           // email: this.email,
           // user: this.user_id
          //},
         // {
           // headers: {
            //  Authorization: "Bearer " + sessionStorage.getItem("token"),
           // },
         // }
        //)
        //.then((res) => console.log(res)); //(this.user = res.data)); //
   // },
    deleteAccount() {
      axios
        .delete("http://localhost:3000/api/auth/" + this.user_id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((res) => console.log(res));
        window.location.reload();
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/auth/" + this.user_id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.user = res.data)); //; console.log("res user : " + res))
  },
};
</script>
<style scoped>
.user_account {
  background-color: rgb(245, 234, 234);
  padding-bottom: 200px;
}

.container {
  max-width: 600px;
  margin: auto;
   padding: 5px;
}

h2 {
  text-align: left;
}

form {
  display: flex;
  flex-direction: column;
  min-height: 150px;
}

form input {
  border: 2px solid rgb(83, 83, 110);
  padding: 15px;
  margin-bottom: 15px;
  box-shadow: inset 3px 3px 3px rgb(83, 83, 110);
}

p {
  text-align: left;
}

.return {
  text-align: right;
  margin-right: 20px;
}

#btn_delete_account {
  margin-top: 70px;
  font-size: 1.1em;
  padding: 13px;
  max-width: 220px;
  transition-duration: 0.6s;
  border: 2px solid rgb(83, 83, 110);
  background-color: white;
  box-shadow: 3px 3px 3px rgb(83, 83, 110);
}

span:hover {
  background-color: rgb(83, 83, 110);
  color: white;
  box-shadow: none;
  border: 2px solid white;
}
</style>
