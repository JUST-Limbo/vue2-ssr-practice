<template>
	<div>
		<div>{{ JSON.stringify(sonobj) }}</div>
		<button @click="changeSonObj">sonboj+1</button>
	</div>
</template>

<script>
export default {
	name: 'son',
	props: {
		objFromFather: Object
	},
	data() {
		return {
			sonobj: this.objFromFather
		}
	},
	methods: {
		changeSonObj() {
			this.sonobj.n += 1
		}
	}
}
</script>
