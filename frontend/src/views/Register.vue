<template>
	<router-link to="/login">Login</router-link> <br><br>
	<div class="wrapper2">
			<form class="register" @submit.prevent="app.register(email, password)">
				<h2>REGISTER</h2><br>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="email" required /><br>
				<input 
					type="password" 
					placeholder="Password" 
					v-model="password" required/><br>
					<br>
					<button class="btn btn-dark" type="submit" value="Register">Register</button>
                    <div v-if="error">{{error}}</div>
			</form>
			</div>
</template>

<script>
import { useApp } from "../stores/index.js"
// import { ref } from 'vue'
// import { useStore } from 'vuex'

export default {
		name: "RegisterView",
		data() {
			return{
				email: "",
				password: "",

			};
		},
		setup() {
			const app = useApp();
			return {
				app,
			};
		},
	};
</script>

<style>
.wrapper2{
    width: 440px;
    padding: 30px 30px 38px;
    background: rgb(120, 165, 190);
    border-radius: 10px;
    flex-direction: column;
    box-shadow: 0 15px 25px rgba(0,0,0,0.1);
    text-align: center;
	margin-left: 410px;
  }

  h2 {
	font-size: 1.85rem;
	margin-bottom: 2rem;
	color: black;
}
</style>