<template>
	<div id="app" :class="{ isLoading }">
		<div id="offCanvas" class="off-canvas position-right" data-off-canvas>
			<ul class="sidebar-menu no-bullet" data-close="offCanvas">
				<li><router-link to="/" exact>Home</router-link></li>
				<!--li><router-link to="/events" exact>Events</router-link></li-->
				<template v-if="!isLoggedIn">
					<li><router-link to="/login" exact>Login</router-link></li>
					<li><router-link to="/signup" exact>Signup</router-link></li>
				</template>
				<template v-else>
					<li><router-link to="/news" exact>News</router-link></li>
					<li><a @click="logout">Logout</a></li>
				</template>
			</ul>
		</div>
		<div class="off-canvas-content grid-container full" data-off-canvas-content>
			<div class="content grid-container">
				<div class="grid-x grid-padding-y">
					<div class="cell small-10">
						<router-link to="/home">
							<span class="logo" />
						</router-link>
					</div>
					<div class="cell small-2">
						<div id="menu" data-toggle="offCanvas" class="float-right">
							<span />
							<span />
							<span />
						</div>
					</div>
				</div>
				<div class="grid-x">
					<div v-if="genericError" class="callout alert">
						{{ genericError }}
					</div>
					<transition name="fade" mode="out-in">
						<router-view />
					</transition>
				</div>
			</div>
		</div>
		<div class="spinner-container">
			<div class="spinner">
				<div class="rect1" />
				<div class="rect2" />
				<div class="rect3" />
				<div class="rect4" />
				<div class="rect5" />
			</div>
		</div>
	</div>
</template>

<script>
import firebase from 'firebase';

export default {
	name : 'App',
	computed : {
		genericError() {
			return this.$store.state.genericError;
		},
		isLoading() {
			return this.$store.state.isLoading;
		},
		isLoggedIn() {
			return this.$store.getters.isLoggedIn;
		}
	},
	mounted() {
		this.offCanvas = new this.$foundation.OffCanvas($('#offCanvas'));
	},
	destroyed() {
		this.offCanvas.destroy();
	},
	methods : {
		logout : function() {
			firebase.auth().signOut().then(() => {
				this.offCanvas.close();
				this.$store.dispatch('setUserState');
				this.$router.replace('login');
			});
		}
	}
};
</script>

<style lang="scss">
	$foundation-palette: (
		primary: #f6d365,
		secondary: #4ca2ff,
		success: #3adb76,
		warning: #ffae00,
		alert: #cc4b37
	);

	@import 'styles/app';

	.spinner-container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: none;

		.isLoading & {
			display: block;
		}
	}

	.logo {
		display: block;
		background-image: url('assets/logo.png');
		width: 200px;
		height: 200px;
	}

	$menuButtonWidth: 60px;
	$menuButtonHeight: 45px;
	$menuBarHeight: 9px;
	$menuLineColor: get-color(primary);
	$menuTransition: .5s ease-in-out;

	.sidebar-menu {
		padding: 20px;
	}

	#menu {
		width: $menuButtonWidth;
		height: $menuButtonHeight;
		position: relative;

		// TODO: fix sizing properly, use mixins?
		-webkit-transform: rotate(0deg) scale(0.6);
		-moz-transform: rotate(0deg) scale(0.6);
		-o-transform: rotate(0deg) scale(0.6);
		transform: rotate(0deg) scale(0.6);
		-webkit-transition: $menuTransition;
		-moz-transition: $menuTransition;
		-o-transition: $menuTransition;
		transition: $menuTransition;
		cursor: pointer;

		span {
			display: block;
			position: absolute;
			height: 9px;
			width: 100%;
			background: $menuLineColor;
			border-radius: 9px;
			opacity: 1;
			left: 0;
			-webkit-transform: rotate(0deg);
			-moz-transform: rotate(0deg);
			-o-transform: rotate(0deg);
			transform: rotate(0deg);
			-webkit-transition: .5s ease-in-out;
			-moz-transition: .5s ease-in-out;
			-o-transition: .5s ease-in-out;
			transition: .5s ease-in-out;
		}

		span:nth-child(1) {
			top: 0;
		}

		span:nth-child(2) {
			top: 18px;
		}

		span:nth-child(3) {
			top: 36px;
		}
	}

	.is-open-right #menu {
		span:nth-child(1) {
			top: 18px;
			-webkit-transform: rotate(135deg);
			-moz-transform: rotate(135deg);
			-o-transform: rotate(135deg);
			transform: rotate(135deg);
		}

		span:nth-child(2) {
			opacity: 0;
			left: -60px;
		}

		span:nth-child(3) {
			top: 18px;
			-webkit-transform: rotate(-135deg);
			-moz-transform: rotate(-135deg);
			-o-transform: rotate(-135deg);
			transform: rotate(-135deg);
		}
	}

</style>
