<template>
	<div class="cell">
		<div class="grid-x">
			<div class="small-12 cell">
				<ul id="example-2">
					<li v-for="(game, index) in games" :key="index">
						{{ game.title }}
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name : 'GameList',
	props : {
		games : {
			type : Object,
			default : null
		}
	}
};
</script>

<style lang="scss" scoped>
	.list {
		border: 1px red solid;
	}
</style>
