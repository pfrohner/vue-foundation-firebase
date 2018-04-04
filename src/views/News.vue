<template>
	<div class="cell">
		<router-link :to="{ path : '/news/' }">
			<h4>News</h4>
		</router-link>
		<div class="grid-x">
			<div v-if="!this.$route.params.id">
				<transition name="fade" mode="out-in">					
					<NewsList :news="news" />
				</transition>
			</div>
			<div v-else>
				<transition name="fade" mode="out-in">					
					<NewsItem :slug="this.$route.params.id" />
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import NewsList from '../components/NewsList';
import NewsItem from '../components/NewsItem';

export default {
	name : 'News',
	components : {
		NewsList,
		NewsItem
	},
	computed : {
		news() {
			return this.$store.state.news;
		}
	},
	created() {
		if (!this.$store.state.news) {
			this.$store.dispatch('fetchData', ['news']);
		}
	}
};
</script>

<style lang="scss" scoped>
	/*@import '~brandStyleConfig';*/

	.test {
		background-color: get-color(primary);
	}
</style>
