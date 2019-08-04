import "firebase/app";
import "firebase/firestore";
import "firebaseui/dist/firebaseui.css";
import Vue from "vue";

import App from "./App.vue";
import "./components/common/common_components";
import "./filters";
import { initFirebase } from "./plugins/firebase";
import vuetify from "./plugins/vuetify"; // path to vuetify export
import createRouter from "./router/router";
import { RootStore } from "./store/Store";
import { StoreImpl } from "./store/StoreImpl";

initFirebase();
export default () => {
    return new Vue({
        router: createRouter(),
        store: StoreImpl.constructStore(),
        render: h => h(App),
        created() {
            this.$store.dispatch(RootStore.Actions.initialize);
        },
        mounted() {
            //
        },
        methods: {},
        ...({ vuetify } as any), // type incompatibility
    });
};
