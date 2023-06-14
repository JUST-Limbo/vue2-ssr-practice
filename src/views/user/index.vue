<template>
	<div>
		<div>userInfo</div>
		<div>name:{{ userInfo.name }}</div>
		<div>age:{{ userInfo.age }}</div>
		<div>gender:{{ userInfo.gender }}</div>
		<a class="testappcss" href="/">123123</a>
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
	data() {
		return {
			tableData: [
				{
					date: "2016-05-02",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1518 弄"
				},
				{
					date: "2016-05-04",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1517 弄"
				},
				{
					date: "2016-05-01",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1519 弄"
				},
				{
					date: "2016-05-03",
					name: "王小虎",
					address: "上海市普陀区金沙江路 1516 弄"
				}
			]
		}
	},
	computed: {
		...mapState(["userInfo"])
	}
}
</script>

<style></style>
