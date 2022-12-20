<template>
	<router-link to="/register">Register</router-link> <br><br>
    <div class="wrapper">
			<form class="login" @submit.prevent="app.login(email, password)">
				<h2>LOGIN</h2><br>
				<input 
					type="email" 
					placeholder="Email address"
					v-model="email" required/><br>
				<input 
					type="password" 
					placeholder="Password" 
					v-model="password" required/><br>
				<!-- <input 
					type="submit" 
					value="Login" /> --><br>
					<button class="btn btn-dark" type="submit" value="Login">Login</button>
					<div v-if="error">{{error}}</div>
			</form>
	</div>
</template>

<script>
import { useApp } from "../stores/index.js"
// import { ref } from 'vue'
// import { useStore } from 'vuex'

export default {
		name: "LoginView",
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
.wrapper{
    width: 440px;
    padding: 30px 30px 38px;
    background: rgb(120, 161, 154);
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
/* .forms1 {
	display: flex;
	min-height: 100vh;
}

/* form {
	flex: 1 1 0%;
	padding: 8rem 1rem 1rem;
} *

form.register {
	flex: 1 1 0%;
	padding: 13rem 1rem 1rem;
	color: #FFF;
	background-color: #A9BD93;
}

form.login {
	flex: 1 1 0%;
	padding: 13rem 1rem 1rem;
	color: #FFF;
	background-color: #B0808C;
}

input {
	appearance: none;
	border: none;
	outline: none;
	background: none;

	display: block;
	width: 100%;
	max-width: 400px;
	margin: 0 auto;
	font-size: 1.2rem;
	margin-bottom: 2rem;
	padding: 0.5rem 0rem;
}

input:not([type="submit"]) {
	opacity: 0.8;
	transition: 0.4s;
}

input:focus:not([type="submit"]) {
	opacity: 1;
}

input::placeholder {
	color: inherit;
}

form.register input:not([type="submit"]) {
	color: #FFF;
	border-bottom: 2px solid #FFF;
}

form.login input:not([type="submit"]) {
	color: #ffffff;
	border-bottom: 2px solid #ffffff;
}

form.login input[type="submit"] {
	background-color: rgb(0, 0, 0);
	color: #FFF;
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
}

form.register input[type="submit"] {	
	background-color: #FFF;
	color: rgb(0, 0, 0);
	font-weight: 700;
	padding: 1rem 2rem;
	border-radius: 0.5rem;
	cursor: pointer;
	text-transform: uppercase;
} */
</style>