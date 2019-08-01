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
    Mutations.SetData.commit(commit, { accounts: [], loadedForRole: state.data.loadedForRole });
    (async () => {
        try {
            let recordsSoFar: Me.AccountLoaderRow[] = [];
            const updaterFn = (newRecords: Me.AccountLoaderRow[]) => {
                recordsSoFar = [...recordsSoFar, ...newRecords];
                Mutations.SetData.commit(commit, { accounts: recordsSoFar, loadedForRole: role });
            };
            await doReloadAccounts(role, updaterFn);
            Mutations.SetState.commit(commit, { loading: false, error: "" });
        } catch (error) {
            Mutations.SetState.commit(commit, { loading: false, error: error.message });
        }
    })();
};

/**
 *
 * Type safe definitions and export
 */
export const actions: ActionTree<Me.State, Me.State> = {
    [Me.Actions.ReloadAccounts.name]: reloadAccounts,
};

/**
 *
 * Reload accounts
 */
async function doReloadAccounts(role: string, appendData: (records: Me.AccountLoaderRow[]) => void) {
    const requestersUids = await FirestoreRolesAdapter.getInstance().getUidsRequestingRole(role);
    const requestersRows = requestersUids.map(uid => uidToRow({ uid, requesting: true }));
    appendData(requestersRows);

    const uidsInRole = await FirestoreRolesAdapter.getInstance().getUidsInRole(role);
    const usersInRoleRows = uidsInRole.map(uid => uidToRow({ uid, requesting: false }));
    appendData(usersInRoleRows);
}

function uidToRow(props: { uid: string; requesting: boolean }): Me.AccountLoaderRow {
    return {
        uid: props.uid,
        requesting: props.requesting,
        loading: true,
        error: "",
        email: "",
        displayName: "",
    };
}
