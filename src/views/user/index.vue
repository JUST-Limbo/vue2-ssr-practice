<template>
	<div>
		<div class="userinfo">userInfo</div>
		<div>name:{{ userInfo.name }}</div>
		<div>age:{{ userInfo.age }}</div>
		<div>gender:{{ userInfo.gender }}</div>
	</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapState } = createNamespacedHelpers("userStore")

export default {
	name: "User",
	asyncData({ store }) {
		return store.dispatch("userStore/getUserInfo")
	},
	computed: {
		...mapState(["userInfo"])
	}
}
</script>

<style lang="scss" scoped>
.userinfo {
	color: red;
}
</style>
