// tslint:disable:max-classes-per-file

import Vue from "vue";
import Vuex from "vuex";
import { ModuleTree } from "vuex";

import { AuthModule } from "./modules/auth/AuthModule";
import { AuthModuleImpl } from "./modules/auth/AuthModuleImpl";
import { RootStore } from "./root/RootStore";
import { RootStoreImpl } from "./root/RootStoreImpl";
import { Store } from "./Store";

Vue.use(Vuex);

export namespace StoreImpl {
    const modules: Store.Modules & ModuleTree<RootStore.State> = {
        [AuthModule.modulePathName]: AuthModuleImpl.module,
    };

    /**
     * Store
     */
    export const store = new Vuex.Store<RootStore.State>({
        strict: window.location.hostname === "localhost" ? true : false, // TODO remove if app
        ...RootStoreImpl.store,
        modules,
    });
}
