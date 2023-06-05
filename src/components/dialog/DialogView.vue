<template>
	<div class="DialogView">
		<component :is="currentView" ref="content"></component>
    <button @click="output">output</button>
	</div>
</template>

<script>
export default {
	name: 'DialogView',
	data() {
		return {
			currentView: null
		}
	},
	methods: {
		show() {
			document.body.appendChild(this.$el)
		},
		hide() {
			this.$destroy(true)
		},
    output(){
      console.log(this.currentView)
      console.log(this.currentView.data().msg)
    }
	}
}
</script>

<style>
</style>
