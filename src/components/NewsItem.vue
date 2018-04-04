<template>
	<div class="cell">
		<div class="grid-x">
			<div v-if="news">
				<h3>{{ news.title }}</h3>
				<p>{{ news.content }}</p>
			</div>
		</div>
	</div>
</template>

<script>
// TODO: WTF is wrong with the lodash import? newsItem bundle size increased by 300k!
// import find from 'lodash.find';

export default {
	name : 'NewsItem',
	computed : {
		news() {
			const slug = this.$attrs.slug;
			const data = this.$store.getters.news;

			if (data) {
				const newsItem = Object.keys(data)
					.filter(news => data[news].slug === slug)
					.map(item => data[item]);

				return newsItem[0];
			}
		}
	}
};
</script>
