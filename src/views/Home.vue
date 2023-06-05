<template>
	<div class="home">
		<div @click="push">
			push /Params
		</div>
    <button @click="$toast">toast</button>
	</div>
</template>


<script>
// @ is an alias to /src

export default {
	name: 'Home',
	components: {},
	methods: {
		push() {
			this.$router.push({
				name: 'routerParams',
				params: {
					a: 1,
					c: 1
				}
			})
		}
	}
}
</script>
