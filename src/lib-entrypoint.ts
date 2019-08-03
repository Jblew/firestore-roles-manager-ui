import { Configuration } from "./config/Configuration";
import VueInitializer from "./index";

export namespace FirestoreRolesManagerAppUI {
    export function mount(tag: string, config: Configuration) {
        window.ROLES_CONFIGURATION = config;

        const vueEntry = VueInitializer();
        vueEntry.$mount(tag);
    }
}
