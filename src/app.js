import Vue from 'vue';
import App from './App.vue';
import { createRouter } from './router';
import { createStore } from './store';
import { sync } from 'vuex-router-sync';

import titleMixin from '@/utils/title'
Vue.mixin(titleMixin)

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
Vue.use(ElementUI)

import "@/styles/common.css"

Vue.config.productionTip = false;
Vue.config.devtools = true

export function createApp() {
    // 创建 router 和 store 实例
    const router = createRouter();
    const store = createStore();

    // 同步路由状态(route state)到 store
    sync(store, router);

    // 创建应用程序实例，将 router 和 store 注入
    const app = new Vue({
        router,
        store,
        render: (h) => h(App),
    });

    // 暴露 app, router 和 store。
    return { app, router, store };
}
