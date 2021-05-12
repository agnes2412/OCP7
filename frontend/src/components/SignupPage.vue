<template>
    <div id="container_signup">
        <form @submit.prevent = signup()>
            <img src="/assets/logo.png" alt="Groupomania logo">
            <nav><router-link to="/">Connexion</router-link> | <router-link to="/signup" class="active">S'inscrire</router-link></nav>
            <label for="signup_name">Name :</label>
            <input id="signup_name" type="text" placeholder="Votre nom" required>

            <label for="signup_email">Email :</label>
            <input id="signup_email" type="email" placeholder="Votre email" required>

            <label for="signup_password">Mot de passe :</label>
            <input id="signup_password" type="password" placeholder="Votre mot de passe" required>

            <div class="error-message">{{message}}</div>

            <button id="signup_btn" type="submit">Inscription</button>
        </form>
    </div>
</template>
