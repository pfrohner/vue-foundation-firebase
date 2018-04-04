<template>
	<div class="cell">
		<h3>Login</h3>
		<form @submit.prevent="login">
			<div class="grid-x">
				<fieldset class="small-12 cell">
					<label>Email
						<input v-model="email" type="text" placeholder="Email" required>
						<span class="form-error">Please provide username</span>
					</label>
				</fieldset>
			</div>
			<div class="grid-x">
				<fieldset class="small-12 columns">
					<label>Password
						<input v-model="password" type="password" placeholder="Password" required>
						<span class="form-error">I'm required!</span>
					</label>
				</fieldset>
			</div>
			<div v-if="message" class="grid-x callout alert">
				{{ message }}
			</div>
			<div class="grid-x">
				<fieldset class="small-12 cell text-center">
					<button type="submit" class="primary button expanded">Login</button>
				</fieldset>
			</div>
		</form>
		<div class="grid-x">
			<p>No account? <router-link to="/signup">Signup!</router-link></p>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase';

export default {
	name : 'Login',
	data() {
		return {
			email : '',
			password : '',
			message : ''
		};
	},
	computed : {
	},
	created() {
	},
	methods : {
		login : function() {
			firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
				()  => {
					this.$store.dispatch('setUserState');
					this.message = 'You have logged in!';
					this.$router.replace('home');
				},
				(err) => {
					this.message = err.message;
				}
			);
		}
	}

};
</script>
