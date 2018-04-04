<template>
	<div class="cell">
		<div class="grid-x">
			<div class="cell test">
				<h3 class="text-center">Hello {{ userName }}!</h3>

				<h4>Recently played games</h4>
				<GameList :games="games" />
			</div>
		</div>
	</div>
</template>

<script>
import GameList from '../components/GameList';

export default {
	name : 'Home',
	components : {
		GameList
	},
	computed : {
		games() {
			return this.$store.state.games;
		},
		userName() {
			return this.$store.getters.userName;
		}
	},
	created() {
		if (!this.$store.state.games) {
			this.$store.dispatch('fetchData', ['games']);
		}
	}
};
</script>

<style lang="scss" scoped>
	/*@import '~brandStyleConfig';*/

	.test {
		background-color: transparent;
	}
</style>
