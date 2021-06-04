<template>
  <div class="one_post">
    <Header />
    <article>
      <h1>Laissez votre commentaire</h1>
      <h2>{{ post.title }}</h2>
      <div>{{ post.content }}</div>
    </article>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
const moment = require("moment");
//@ is an alias to /src

export default {
  name: "OnePost",
  components: {
    Header,
  },

  data() {
    return {
      moment: moment,
      post: "",
      id: this.$route.params.id,
      userId: sessionStorage.getItem('userId'),
      statut: sessionStorage.getItem("userStatut"), 
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/posts/" + this.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => (this.post = res.data));
  },
};
</script>
