<template>
	<div>
		<div>详情页</div>
		<el-descriptions title="用户信息">
			<el-descriptions-item label="用户名">{{ userDetail.name }}</el-descriptions-item>
			<el-descriptions-item label="手机号">{{ userDetail.phone }}</el-descriptions-item>
			<el-descriptions-item label="居住地">{{ userDetail.address }}</el-descriptions-item>
			<el-descriptions-item label="备注">
				<el-tag size="small">{{ userDetail.remark }}</el-tag>
			</el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script>
import { createNamespacedHelpers } from "vuex"
const { mapState } = createNamespacedHelpers("userDetailStore")
export default {
	name: "UserDetail",
	asyncData({ store, route }) {
		const params = route.params
		return store.dispatch("userDetailStore/queryUserDetailById", {
			id: params.id
		})
	},
    metaInfo: {
		title: "title from user/userDetail.vue",
		meta: [
			{
				vmid: "keywords",
				name: "keywords",
				content: "keywords from user/userDetail.vue"
			},
			{
				vmid: "description",
				name: "description",
				content: "description from user/userDetail.vue"
			}
		]
	},
	title() {
		return "用户详情：" + this.userDetail.name
	},
	computed: {
		...mapState(["userDetail"])
	}
}
</script>
