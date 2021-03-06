import Vue from "vue";
import App from "C:\Users\romak\WebstormProjects\express-vue-example\src\views\main.vue";

export function createApp(data) {
    const mergedData = Object.assign(App.data ? App.data() : {}, data);
    App.data = () => (mergedData)
 
    const app = new Vue({
        data,
        render: h => h(App),
    });
    return { app };
}