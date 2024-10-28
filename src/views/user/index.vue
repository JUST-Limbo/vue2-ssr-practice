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
	metaInfo: {
		title: "title from user/index.vue",
		meta: [
			{
				vmid: "keywords",
				name: "keywords",
				content: "keywords from user/index.vue"
			},
			{
				vmid: "description",
				name: "description",
				content: "description from user/index.vue"
			}
		]
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
