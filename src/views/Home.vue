<template>
	<div class="home">
		<div>后端接口地址</div>
		<div><a href="https://github.com/JUST-Limbo/mock-backend" target="_blank">https://github.com/JUST-Limbo/mock-backend</a></div>
		<el-descriptions title="垂直带边框列表" direction="vertical" :column="1" border>
			<el-descriptions-item label="登录">
				<router-link to="/login">/login</router-link>
			</el-descriptions-item>
			<el-descriptions-item label="当前登录用户信息">
				<router-link to="/user">/user</router-link>
			</el-descriptions-item>
			<el-descriptions-item label="用户列表">
				<router-link to="/userlist">/userlist</router-link>
			</el-descriptions-item>
			<el-descriptions-item label="用户详情">
				<router-link to="/user/1">/user/1 查询不到会跳404</router-link>
			</el-descriptions-item>
			<el-descriptions-item label="用户详情">
				<router-link to="/user/103">/user/103</router-link>
			</el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script>
export default {
	name: "Home"
}
</script>
