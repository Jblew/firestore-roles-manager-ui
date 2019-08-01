import ow from "ow";
import { ActionTree } from "vuex";

import { FirestoreRolesAdapter } from "../../../adapter/FirestoreRolesAdapter";

import { RolesModule as Me } from "./RolesModule";

/**
 *
 * Actions implementation
 */
const reloadAccounts: Me.Actions.ReloadAccounts.Declaration = ({ commit, state }, payload: { role: string }) => {
    ow(payload.role, ow.string.nonEmpty.is(r => FirestoreRolesAdapter.getInstance().isAvailableRole(r)));

    // to be continued
};

/**
 *
 * Type safe definitions and export
 */
export const actions: ActionTree<Me.State, Me.State> = {
    [Me.Actions.ReloadAccounts.name]: reloadAccounts,
};
