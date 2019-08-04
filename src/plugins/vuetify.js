import Vue from "vue";

import Vuetify from "vuetify/lib";
Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: "fa",
    },
    theme: {
        dark: true,
        themes: {
            dark: {
                accent: "#F44336",
                primary: "#4caf50",
                secondary: "#607d8b",
            },
        },
    },
});
