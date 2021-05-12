<script>
import Signup from './components/Signup.vue'

export default {
	name: 'App',
	components: {
		Signup
	}
}
</script>

<template>
	<div id="container_signup">
		<nav>
			<Signup />
			<a href="/about">À propos</a>
			<a href="/contact">Contact</a>
		</nav>
		<p>Bienvenue sur notre page de <Signup /></p>
	</div>
</template>