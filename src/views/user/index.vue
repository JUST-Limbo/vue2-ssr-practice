<template>
	<div>userinfo</div>
</template>

<script>
// import { createNamespacedHelpers } from "vuex"
// const { mapState, mapActions } = createNamespacedHelpers("userStore")

export default {
	name: "User",
	asyncData({ store, route, Cookie }) {
		return store.dispatch("userStore/getUserInfo")
	}
}
</script>

<style></style>
