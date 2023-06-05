<template>
	<div>
		<div><button @click="mount">$mount</button></div>
	</div>
</template>

<script>
import Dialog from '../../components/dialog/dialog.js'
import dialogContent from './cmp/dialogContent.vue'
import dialogContent2 from './cmp/dialogContent2.vue'
export default {
	name: 'dialogtest',
	data() {
		return {}
	},
	methods: {
		mount() {
			new Dialog(dialogContent,dialogContent2).show()
		}
	}
}
</script>

<style></style>
