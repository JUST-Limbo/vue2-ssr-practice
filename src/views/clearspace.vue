<template>
    <div>
        <div><input type="text" v-model="value" v-clearSpace /></div>
        <div><input type="text" v-model="value" @input="input" /></div>
        <div>{{ value }}</div>
        <div><button @click="logvalue">输出value</button></div>
        <div>
            <el-input v-model="value" @input="elinput"></el-input>
        </div>
    </div>
</template>

<script>
export default {
    name: "clearspace",
    data() {
        return {
            value: "1",
        };
    },
    directives: {
        clearSpace: {
            bind(el, binding, vnode) {
                el.inputHandler = (e) => {
                    console.log(Object.prototype.toString.call(e));
                    console.log(e);
                    console.log(vnode)
                    /**
                     * 正常输入 e 是InputEvent对象,其data属性值是输入
                     * 粘贴输入 e 是InputEvent对象,其data属性是null
                     * 手动触发的dispatchEvent(new Event('input'))
                     */
                    if (Object.prototype.toString.call(e).indexOf("InputEvent") > -1) {
                        el.value = el.value.replace(/\s/g, "");
                        el.dispatchEvent(new Event("input"));
                    }
                    return el.value.replace(/\s/g, "")
                };
                el.addEventListener("input", el.inputHandler);
            },
            unbind(el) {
                el.removeEventListener("input", el.inputHandler);
            },
        },
    },
    methods: {
        logvalue() {
            console.log(this.value);
        },
        input(e) {
            console.log(e);
            console.log(e.target.value);
            this.value = this.value.replace(/\s/g, "");
        },
        elinput(e) {
            console.log(e);
        },
    },
};
</script>
