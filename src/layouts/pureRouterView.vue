<template>
	<router-view></router-view>
</template>

<script>
export default {
	name: "PureRouterView",
    serverCacheKey: () => "PureRouterView",
}
</script>
