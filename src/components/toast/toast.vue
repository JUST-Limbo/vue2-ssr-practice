<template>
	<div class="container" v-show="show">
		<div>{{ text }}</div>
	</div>
</template>

<script>
export default {
	name: 'Toast'
}
</script>

<style>
.container {
	position: fixed;
	top: calc(50% - 20px);
	left: calc(50% - 50px);
	width: 100px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	color: #fff;
	background-color: rgba(0, 0, 0, 0.8);
	border-radius: 10px;
	box-sizing: border-box;
}
</style>
