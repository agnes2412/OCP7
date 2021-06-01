<template>
  <div class="one_post">
    <Header />
    <article>
      <h1>Laissez votre commentaire</h1>
      <h2>{{}}</h2>
      <div>{{}}</div>
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
      post: [],
    };
  },

  mounted() {
    axios
      .get("http://localhost:3000/api/posts/:id", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((res) => console.log(res.data)); //(this.post = res.data));
  },
};
</script>
