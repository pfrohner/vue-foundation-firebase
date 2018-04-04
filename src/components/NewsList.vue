<template>
	<div class="cell">
		<div class="grid-x">
			<div v-if="news" class="small-12 cell">
				<ul id="example-2" class="no-bullet">
					<li v-for="(item, index) in news" :key="index">
						<h3><router-link :to="{ path : '/news/' + item.slug }">{{ item.title }}</router-link></h3>
						<p>{{ item.lead }}</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name : 'NewsList',
	props : {
		news : {
			type : Object,
			default : null
		}
	}
};
</script>
