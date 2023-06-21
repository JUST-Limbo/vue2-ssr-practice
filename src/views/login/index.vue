<template>
	<div>
		<div>登录页Login</div>
		<div>/login页面使用了类似于Redis的页面级别缓存机制</div>
		<div>你可以在运行 npm run preview 尝试访问/login</div>
		<div>首次访问会走renderToString,第二次访问得到的是上次的缓存结果</div>
		<div>相关代码在 /server/config/cachePage.js</div>
		<div><a href="https://v2.ssr.vuejs.org/zh/guide/caching.html#%E9%A1%B5%E9%9D%A2%E7%BA%A7%E5%88%AB%E7%BC%93%E5%AD%98-page-level-caching" target="_blank">关于页面级缓存的文档描述</a></div>
		<el-form label-position="top" label-width="80px" :model="loginFormModel" size="small" style="width: 300px">
			<el-form-item label="用户名">
				<el-input v-model="loginFormModel.id" placeholder="用户名密码都是id" clearable></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="loginFormModel.password" placeholder="用户名密码都是id" clearable></el-input>
			</el-form-item>
			<el-form-item>
				<el-button @click="login" type="primary">登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { login } from "@/api/user.js"

export default {
	name: "Login",
	serverCacheKey: () => "login",
	data() {
		return {
			loginFormModel: {
				id: "",
				password: ""
			}
		}
	},
	methods: {
		login() {
			login({
				...this.loginFormModel
			})
				.then((res) => {
					this.$message.success("login success")
					const redirectUrl = this.$route.query.redirectUrl
					if (redirectUrl) {
						setTimeout(() => {
							location.replace(decodeURIComponent(redirectUrl))
						}, 1000)
					} else {
						this.$router.replace({
							name: "Home"
						})
					}
				})
				.catch((err) => {
					this.$message.error(err.msg)
				})
		}
	}
}
</script>
