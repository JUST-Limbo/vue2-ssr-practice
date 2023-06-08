<template>
    <div class="home">
        <div @click="push" class="red">BBB</div>
        <div>11231223123</div>
        <!-- <button @click="$toast">to123123123ast</button> -->
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Home',
    methods: {
        push() {
            this.$router.push({
                name: 'routerParams',
                params: {
                    a: 1,
                    c: 1,
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.red {
    color: blue;
}
</style>
