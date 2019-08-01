import ow from "ow";
import { ActionTree } from "vuex";

import { FirestoreRolesAdapter } from "../../../adapter/FirestoreRolesAdapter";

import { Mutations } from "./Mutations";
import { RolesModule as Me } from "./RolesModule";

/**
 *
 * Actions implementation
 */
const reloadAccounts: Me.Actions.ReloadAccounts.Declaration = ({ commit, state }, payload: { role: string }) => {
    ow(payload.role, ow.string.nonEmpty.is(r => FirestoreRolesAdapter.getInstance().isAvailableRole(r)));
    const role = payload.role;

    Mutations.SetRole.commit(commit, role);
    Mutations.SetState.commit(commit, { loading: true, error: "" });
};

/**
 *
 * Type safe definitions and export
 */
export const actions: ActionTree<Me.State, Me.State> = {
    [Me.Actions.ReloadAccounts.name]: reloadAccounts,
};
