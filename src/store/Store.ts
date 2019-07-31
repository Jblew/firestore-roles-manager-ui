import { CombinedVueInstance } from "vue/types/vue";
import { Commit, Dispatch, Module } from "vuex";

import { AuthModule } from "./modules/auth/AuthModule";
import { NotificationsModule } from "./modules/notifications/NotificationsModule";
import { RootStore } from "./root/RootStore";

export interface Store {
    state: Store.State;
    dispatch: Dispatch;
    commit: Commit;
    getters: any;
}

export namespace Store {
    export interface Modules {
        [AuthModule.modulePathName]: Module<AuthModule.State, RootStore.State>;
        [NotificationsModule.modulePathName]: Module<NotificationsModule.State, RootStore.State>;
    }

    export type State = {
        [AuthModule.modulePathName]: AuthModule.State;
        [NotificationsModule.modulePathName]: NotificationsModule.State;
    } & RootStore.State;

    /**
     * This function allows proper store type resolution & guarding.
     */
    export function of(vueInstance: CombinedVueInstance<any, any, any, any, any>): Store {
        return vueInstance.$store as Store;
    }
}

export { RootStore } from "./root/RootStore";
