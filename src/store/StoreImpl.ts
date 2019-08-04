// tslint:disable:max-classes-per-file

import Vue from "vue";
import Vuex from "vuex";
import { ModuleTree } from "vuex";
import { NotificationsModule, NotificationsModuleImpl } from "vuex-notifications-module";

import { AuthModule } from "./modules/auth/AuthModule";
import { AuthModuleImpl } from "./modules/auth/AuthModuleImpl";
import { RolesModule } from "./modules/roles/RolesModule";
import { RolesModuleImpl } from "./modules/roles/RolesModuleImpl";
import { RootStore } from "./root/RootStore";
import { RootStoreImpl } from "./root/RootStoreImpl";
import { Store } from "./Store";

Vue.use(Vuex);

export namespace StoreImpl {
    const modules: Store.Modules & ModuleTree<RootStore.State> = {
        [AuthModule.modulePathName]: AuthModuleImpl.module,
        [AuthModule.modulePathName]: AuthModuleImpl.module,
        [NotificationsModule.modulePathName]: NotificationsModuleImpl.module,
        [RolesModule.modulePathName]: RolesModuleImpl.module,
    };

    /**
     * Store
     */
    export const store = new Vuex.Store<RootStore.State>({
        strict: window.location.hostname === "localhost" ? true : false,
        ...RootStoreImpl.store,
        modules,
    });
}
