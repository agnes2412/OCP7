<template>

  <div class="posts">
    <PostsPage />
  </div>
  
</template>

<script>
// @ is an alias to /src
import PostsPage from "@/components/PostsPage.vue";
export default {
  name: "Posts",
  components: {
    PostsPage,
  },
};
</script>