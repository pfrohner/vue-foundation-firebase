<template>
	<div class="cell">
		<h3>Signup</h3>
		<form @submit.prevent="login">
			<div class="grid-x">
				<fieldset class="small-12 cell">
					<label>Email
						<input v-model="email" type="text" placeholder="Email" required>
						<span class="form-error">Please provide username.</span>
					</label>
				</fieldset>
			</div>
			<div class="grid-x">
				<fieldset class="small-12 columns">
					<label>Password
						<input v-model="password" type="password" placeholder="Password" required>
						<span class="form-error">Please choose a password.</span>
					</label>
				</fieldset>
			</div>
			<div v-if="message" class="grid-x callout alert">
				{{ message }}
			</div>
			<div class="grid-x">
				<fieldset class="small-12 cell text-center">
					<button class="primary button expanded" @click="signup">Signup</button>
				</fieldset>
			</div>
		</form>
		<div class="grid-x">
			<p>Already registered? <router-link to="/login">Login!</router-link></p>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase';

export default {
	name : 'Signup',
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
		signup : function() {
			firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
				()  => {
					this.message = 'Account has been created!';
				},
				(err) => {
					this.message = err.message;
				}
			);
		}
	}

};
</script>

<style lang="scss" scoped>

</style>
