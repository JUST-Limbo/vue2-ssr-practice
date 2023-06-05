<template>
	<div>
		<div>{{ count }}</div>

		<button @click="count++">count++</button>
		<button @click="pushsameroute">push same route</button>
	</div>
</template>

<script>
export default {
	name: 'pushsameroute',
	data() {
		return {
			count: 1
		}
	},
	methods: {
		pushsameroute() {
			this.$router.push({
				name: 'pushsameroute',
				params: {
					time: +new Date()
				}
				// query: {
				// 	time: +new Date()
				// }
			})
		}
	}
}
</script>

<style scoped></style>
