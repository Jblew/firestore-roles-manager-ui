import { CombinedVueInstance } from "vue/types/vue";
import { Commit, Dispatch, Module } from "vuex";

import { AuthModule } from "./modules/auth/AuthModule";
import { RootStore } from "./root/RootStore";

/**
 * Store type guard
 */
export interface Store {
    state: Store.State;
    dispatch: Dispatch;
    commit: Commit;
    getters: any;
}

export namespace Store {
    export interface Modules {
        [AuthModule.modulePathName]: Module<AuthModule.State, RootStore.State>;
    }

    export type State = {
        [AuthModule.modulePathName]: AuthModule.State;
    } & RootStore.State;

    /**
     * This function allows proper store type resolution & guarding.
     * @param incognitoStore
     */
    export function of(vueInstance: CombinedVueInstance<any, any, any, any, any>): Store {
        return vueInstance.$store as Store;
    }
}

export { RootStore } from "./root/RootStore";
