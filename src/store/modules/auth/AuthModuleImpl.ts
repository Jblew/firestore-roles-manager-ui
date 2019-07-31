// tslint:disable:no-console

import { Module } from "vuex";

import { AuthModule as Me } from "./AuthModule";
import { actions } from "./impl_actions";
import { getters } from "./impl_getters";
import { mutations } from "./impl_mutations";
import { state } from "./impl_state";

export namespace AuthModuleImpl {
    export const module: Module<Me.State, any> = {
        state,
        mutations,
        actions,
        getters,
    };
}
