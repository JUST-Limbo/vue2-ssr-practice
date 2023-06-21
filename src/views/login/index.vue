<template>
	<div>
		<div>登录页Login</div>
		<div>用户名密码都是id</div>
		<el-form label-position="top" label-width="80px" :model="loginFormModel" size="small" style="width: 300px">
			<el-form-item label="用户名">
				<el-input v-model="loginFormModel.id" clearable></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="loginFormModel.password" clearable></el-input>
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
