/*import VueInitializer from "./index";

const vueEntry = VueInitializer();
vueEntry.$mount("#app");
*/

import { FirestoreRolesManagerAppUI } from "./lib-entrypoint";
FirestoreRolesManagerAppUI.mount("#app", window.LOADABLE_ROLES_CONFIGURATION);

declare global {
    interface Window {
        LOADABLE_ROLES_CONFIGURATION: any;
    }
}
