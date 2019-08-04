import { RolesAuthModule } from "firestore-roles-vuex-module";
import { CombinedVueInstance } from "vue/types/vue";
import { Commit, Dispatch, Module } from "vuex";
import { NotificationsModule } from "vuex-notifications-module";

import { RolesModule } from "./modules/roles/RolesModule";
import { RootStore } from "./root/RootStore";

export interface Store {
    state: Store.State;
    dispatch: Dispatch;
    commit: Commit;
    getters: any;
}

export namespace Store {
    export interface Modules {
        [RolesAuthModule.modulePathName]: Module<RolesAuthModule.State, RootStore.State>;
        [NotificationsModule.modulePathName]: Module<NotificationsModule.State, RootStore.State>;
        [RolesModule.modulePathName]: Module<RolesModule.State, RootStore.State>;
    }

    export type State = {
        [RolesAuthModule.modulePathName]: RolesAuthModule.State;
        [NotificationsModule.modulePathName]: NotificationsModule.State;
        [RolesModule.modulePathName]: RolesModule.State;
    } & RootStore.State;

    /**
     * This function allows proper store type resolution & guarding.
     */
    export function of(vueInstance: CombinedVueInstance<any, any, any, any, any>): Store {
        return vueInstance.$store as Store;
    }
}

export { RootStore } from "./root/RootStore";
