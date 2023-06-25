<template>
	<router-view></router-view>
</template>

<script>
export default {
	name: "PureRouterView",
    // 它会缓存整个子树,当命中缓存时,其子组件不会运行created
    // 如果你在子组件的created中操作context,命中缓存的场景下操作context是做不到的
    // 详见 https://v2.ssr.vuejs.org/zh/guide/caching.html#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8%E7%BB%84%E4%BB%B6%E7%BC%93%E5%AD%98
    //  在以下情况，你不应该缓存组件：它具有对渲染上下文产生副作用(side effect)的子组件。
    // serverCacheKey: () => "PureRouterView",
}
</script>
