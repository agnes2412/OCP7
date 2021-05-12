<template>
  <div class="signup">
    <SignupPage/>
  </div>
</template>

<script>
// @ is an alias to /src
import SignupPage from '@/components/SignupPage.vue';
export default {
  name: 'Signup',
  components: {
    SignupPage
  },
}
</script>