<template>
	<div class="home">
		<div @click="push">
			push /bbbb
		</div>
    <!-- <button @click="$toast">to123123123ast</button> -->
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
