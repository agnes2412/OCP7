<template>
  <article>
      <h2>{{ post.title }}</h2>
      <div>{{ post.content }}</div>
  </article>
</template>

<script>
import axios from "axios";
//@ is an alias to /src

export default {
  name: "OnePost",

  data() {
    return {
      post: [],
    };
  },

  mounted(){
      this.getOnePost();
  }
};
</script>
