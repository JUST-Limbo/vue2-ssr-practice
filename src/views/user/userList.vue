<template>
	<div>
		<div>列表页</div>
		<div>el-table的表格DOM节点看起来是在client端进行渲染的,右键查看源码发现直出的DOM结构里没渲染</div>
		<el-form :inline="true" :model="formModel" size="small">
			<el-form-item label="姓名">
				<el-input v-model="formModel.name" placeholder="姓名" clearable></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-select v-model="formModel.gender" placeholder="性别" clearable>
					<el-option label="男" value="男"></el-option>
					<el-option label="女" value="女"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">查询</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="userList" style="width: 100%">
			<el-table-column prop="id" label="id" width="180"> </el-table-column>
			<el-table-column prop="name" label="姓名" width="180"> </el-table-column>
			<el-table-column prop="age" label="年龄"> </el-table-column>
			<el-table-column prop="gender" label="性别"> </el-table-column>
			<el-table-column label="操作">
				<template #default="{ row }">
					<router-link
						:to="{
							name: 'UserDetail',
							params: {
								id: row.id
							}
						}"
					>
						详情
					</router-link>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination :current-page.sync="formModel.page" :page-size.sync="formModel.pageSize" layout="total, sizes,prev, pager, next" :total="total" @size-change="pagination" @current-change="pagination"> </el-pagination>
		<div>原生table的渲染不同于el-table,右键查看源码可以观察到,服务器直出内容中有表格DOM节点</div>
		<div class="red">
			<div>注意:table标签族在使用时要显式的声明tbody,否则会报hydrating fail</div>
			<a href="https://blog.lichter.io/posts/vue-hydration-error/" target="_blank">https://blog.lichter.io/posts/vue-hydration-error/</a>
		</div>
		<table>
			<tbody>
				<tr v-for="item in userList" :key="item.id">
					<td>{{ item.id }}</td>
					<td>{{ item.name }}</td>
					<td>{{ item.age }}</td>
					<td>{{ item.gender }}</td>
					<td>
						<router-link
							:to="{
								name: 'UserDetail',
								params: {
									id: item.id
								}
							}"
						>
							详情
						</router-link>
					</td>
				</tr>
			</tbody>
		</table>
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
			gender: (query && query.gender) || "",
			name: (query && query.name) || ""
		})
	},
	computed: {
		...mapState(["userList", "total"])
	},
	data() {
		const query = this.$route.query
		return {
			formModel: {
				name: (query && query.name) || "",
				gender: (query && query.gender) || "",
				page: (query && Number(query.page)) || 1,
				pageSize: (query && Number(query.pageSize)) || 10
			}
		}
	},
	methods: {
		onSubmit() {
			this.formModel.page = 1
			this.pagination()
		},
		pagination() {
			this.$router.push({
				name: "Userlist",
				query: filterValidValues(
					{
						...this.$route.query,
						name: this.formModel.name,
						gender: this.formModel.gender,
						page: this.formModel.page,
						pageSize: this.formModel.pageSize
					},
					[undefined, null, ""]
				)
			})
		}
	}
}
</script>

<style scoped>
.red {
	color: red;
}
</style>
