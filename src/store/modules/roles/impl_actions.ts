// tslint:disable no-console
import ow from "ow";
import { ActionTree } from "vuex";

import { FirestoreRolesAdapter } from "../../../adapter/FirestoreRolesAdapter";

import { Mutations } from "./Mutations";
import { PrivateActions } from "./PrivateActions";
import { RolesModule as Me } from "./RolesModule";

/**
 *
 * Actions implementation
 */
const reloadAccounts: Me.Actions.ReloadAccounts.Declaration = (
    { commit, dispatch, state },
    payload: { role: string },
) => {
    ow(payload.role, ow.string.nonEmpty.is(r => FirestoreRolesAdapter.getInstance().isAvailableRole(r)));
    const role = payload.role;

    Mutations.SetRole.commit(commit, role);
    Mutations.SetState.commit(commit, { loading: true, error: "" });
    Mutations.SetData.commit(commit, { accounts: [], loadedForRole: state.data.loadedForRole });

    function ensureAccountsInCache(uids: string[]) {
        for (const uid of uids) {
            PrivateActions.EnsureAccountInCache.dispatch(dispatch, uid);
        }
    }

    (async () => {
        try {
            let recordsSoFar: Me.AccountLoaderRow[] = [];
            const appendToTable = (newRecords: Me.AccountLoaderRow[]) => {
                recordsSoFar = [...recordsSoFar, ...newRecords];
                Mutations.SetData.commit(commit, { accounts: recordsSoFar, loadedForRole: role });
                ensureAccountsInCache(newRecords.map(r => r.uid));
            };
            await doReloadAccounts(role, appendToTable);
            Mutations.SetState.commit(commit, { loading: false, error: "" });
        } catch (error) {
            Mutations.SetState.commit(commit, { loading: false, error: error.message });
            console.error(error);
        }
    })();
};

const ensureAccountInCache: PrivateActions.EnsureAccountInCache.Declaration = ({ commit, state }, uid: string) => {
    const presentCacheRecord: Me.AccountCacheRecord = state.accountCache[uid];

    if (!presentCacheRecord || (presentCacheRecord.error && presentCacheRecord.loading === false)) {
        Mutations.CacheAccount.commit(commit, { error: "", loading: true, uid });
        (async () => {
            try {
                const ar = await FirestoreRolesAdapter.getInstance().getAccountRecord(uid);

                Mutations.CacheAccount.commit(commit, { uid, error: "", loading: false, account: ar });
            } catch (error) {
                Mutations.CacheAccount.commit(commit, { error: error.message, loading: false, uid });
                console.error(error);
            }
        })();
    }
};

/**
 *
 * Type safe definitions and export
 */
export const actions: ActionTree<Me.State, Me.State> = {
    [Me.Actions.ReloadAccounts.name]: reloadAccounts,
    [PrivateActions.EnsureAccountInCache.name]: ensureAccountInCache,
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
    };
}
