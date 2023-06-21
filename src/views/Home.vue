<template>
	<div class="home">
		<div>后端接口地址</div>
		<div><a href="https://github.com/JUST-Limbo/mock-backend" target="_blank">https://github.com/JUST-Limbo/mock-backend</a></div>
		<el-descriptions
			title="垂直带边框列表"
			:column="1"
			border
			:labelStyle="{
				color: 'black'
			}"
		>
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
			<el-descriptions-item label="重定向">
				<div>
					<a href="/baidu"> 重定向到baidu,在render之前,这通常用来做移动端或PC端的重定向、页面的版本兼容 </a>
				</div>
				<div>注意不能使用router-link,router-link会在client端内跳转,client端在hydration后本质上是一个spa应用</div>
			</el-descriptions-item>
		</el-descriptions>
	</div>
</template>

<script>
export default {
	name: "Home",
	serverCacheKey: () => "Home"
}
</script>
