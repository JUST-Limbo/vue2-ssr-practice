<template>
    <div class="home">
        <div @click="push" class="red">BBB</div>
        <div>11231223123</div>
        {{txt}}
        <!-- <button @click="$toast">to123123123ast</button> -->
    </div>
</template>

<script>
// @ is an alias to /src

export default {
    name: 'Home',
    data(){
        return {
            txt:''
        }
    },
    asyncData(){
        console.log(123,typeof window)
    },
    created() {
        console.log('create')
        if (typeof window == 'undefined') {
            console.log(1)
            this.txt = 'server';
        }
    },
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
