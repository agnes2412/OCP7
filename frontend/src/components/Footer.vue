<template>
  <footer>
    <a :href="'mailto:admin@admin.fr'">Contact </a>
    <div class="deco"></div>
  </footer>
</template>

<style scoped>
footer {
  background-color: rgb(165, 166, 168);
  padding-top: 20px;
  padding-bottom: 20px;
  margin-top: 80px;
}

a {
  color: rgb(41, 45, 73);
}

.deco {
    padding-top: 15px;
    text-align: right;
    width: 55%;
    border-bottom: 5px solid rgb(165, 59, 77);
}
</style>