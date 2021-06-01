<template>
<div class="user_account">
    <Header />
    <h1>Mon compte</h1>
</div>
</template>
<script>
import Header from "@/components/Header.vue";

export default {
  name: "UserAccount",
  components: {
    Header,
  },
  data() {
    return {
      user: [],
      statut: sessionStorage.getItem("userStatut"),
    };
  },
}
</script>
