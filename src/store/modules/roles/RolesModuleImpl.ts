import { Module } from "vuex";

import { actions } from "./impl_actions";
import { mutations } from "./impl_mutations";
import { state } from "./impl_state";
import { RolesModule as Me } from "./RolesModule";

export namespace RolesModuleImpl {
    export const module: Module<Me.State, any> = {
        state,
        mutations,
        actions,
    };
}
