<template>
  <footer>
      
    <a :href="'mailto:admin@admin.fr'"><span>Contact</span>
    </a>
    <div class="deco"></div>
    
  </footer>
</template>

<style scoped>
footer {
  background-color: rgb(165, 166, 168);
  padding-top: 25px;
  padding-bottom: 35px;
  margin-top: 80px;
}

a {
  color: rgb(41, 45, 73);
  margin-left: 50px;
  margin-top: 50px;
}

.deco {
    margin-top: 0;
    width: 55%;
    border-bottom: 5px solid rgb(165, 59, 77);
}

span {
    font-size: 1.2em;
    position: absolute;
    margin-left: 80px;
    margin-top: 10px;
}

</style>