<template>
	<div>
		<div>userList</div>
        <div>el-table的表格DOM节点看起来是在client端进行渲染的,右键查看源码发现直出的DOM结构里没渲染</div>
		<el-table :data="userList" style="width: 100%">
			<el-table-column prop="id" label="日期" width="180"> </el-table-column>
			<el-table-column prop="name" label="姓名" width="180"> </el-table-column>
			<el-table-column prop="age" label="年龄"> </el-table-column>
			<el-table-column prop="gender" label="性别"> </el-table-column>
		</el-table>
		<el-pagination :current-page.sync="page" :page-size="pageSize" layout="total, sizes,prev, pager, next" :total="total" @size-change="pagination" @current-change="pagination"> </el-pagination>
	</div>
</template>

<script>
import { filterValidValues } from "@/utils"

import { createNamespacedHelpers } from "vuex"
const { mapState } = createNamespacedHelpers("userListStore")

export default {
	name: "UserList",
	asyncData({ store, route }) {
		const query = route.query
		return store.dispatch("userListStore/fetchUserList", {
			page: (query && Number(query.page)) || 1,
			pageSize: (query && Number(query.pageSize)) || 10,
			name: (query && query.name) || ""
		})
	},
	computed: {
		...mapState(["userList", "total"])
	},
	data() {
		const query = this.$route.query
		return {
			page: (query && Number(query.page)) || 1,
			pageSize: (query && Number(query.pageSize)) || 10,
			name: (query && query.name) || ""
		}
	},
	methods: {
		pagination() {
			this.$router.push({
				name: "Userlist",
				query: filterValidValues(
					{
						...this.$route.query,
						name: this.name,
						page: this.page,
						pageSize: this.pageSize
					},
					[undefined, null, ""]
				)
			})
		}
	}
}
</script>
