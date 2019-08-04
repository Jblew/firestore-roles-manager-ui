// tslint:disable no-console
import { Action as VuexAction, ActionTree, Commit, Dispatch } from "vuex";
import { NotificationsModule } from "vuex-notifications-module";

import { FirestoreRolesAdapter } from "../../../adapter/FirestoreRolesAdapter";
import { FirebaseAuthHelper } from "../../../helper/FirebaseAuthHelper";

import { AuthModule as Me } from "./AuthModule";
import { Mutations } from "./Mutations";
import { PrivateActions } from "./PrivateActions";

type ActionFn = VuexAction<Me.State, Me.State>;

/**
 *
 * Initialize
 */
namespace Initialize {
    export const initialize: ActionFn = ({ commit, dispatch }) => {
        FirebaseAuthHelper.initialize({
            authenticatedCb: user => onAuthenticated(commit, dispatch, user),
            notAuthenticatedCb: () => onNotAuthenticated(commit),
            errorCb: msg => onError(commit, dispatch, msg),
        });
    };

    function onAuthenticated(commit: Commit, dispatch: Dispatch, user: FirebaseAuthHelper.User) {
        Mutations.SetUser.commit(commit, { user });
        Mutations.SetState.commit(commit, { state: Me.AuthState.AUTHENTICATED });

        PrivateActions.EnsureAccountRegistered.dispatch(dispatch, user);
    }

    function onNotAuthenticated(commit: Commit) {
        console.log("User not authenticated");
        Mutations.SetState.commit(commit, { state: Me.AuthState.NOTAUTHENTICATED });
    }

    function onError(commit: Commit, dispatch: Dispatch, errorMsg: string) {
        Mutations.SetState.commit(commit, { state: Me.AuthState.NOTAUTHENTICATED });

        NotificationsModule.Actions.ShowNotification.dispatch(
            dispatch,
            createErrorNotification(`Could not authenticate: ${errorMsg}`),
        );
    }
}
/**
 *
 * Logout
 */
namespace Logout {
    export const logout: ActionFn = ({ commit }) => {
        Mutations.SetState.commit(commit, { state: Me.AuthState.LOADING });
        (async () => {
            await FirebaseAuthHelper.signOut();
            Mutations.SetState.commit(commit, { state: Me.AuthState.NOTAUTHENTICATED });
            Mutations.ResetUser.commit(commit);
        })();
    };
}

/**
 *
 * EnsureAccountRegistered
 */
namespace EnsureAccountRegistered {
    export const ensureAccountRegistered: PrivateActions.EnsureAccountRegistered.Declaration = (
        { dispatch },
        user: FirebaseAuthHelper.User,
    ) => {
        (async () => {
            try {
                await doEnsureRegistered(user);
            } catch (error) {
                console.error(error);
                showError(dispatch, `Could not ensure user is registered: ${error.message}`);
            }
        })();
    };

    async function doEnsureRegistered(user: FirebaseAuthHelper.User) {
        const userExists = await FirestoreRolesAdapter.getInstance().userExists(user.uid);
        if (!userExists) {
            await FirestoreRolesAdapter.getInstance().registerUser(user);
        }
    }

    function showError(dispatch: Dispatch, errorMsg: string) {
        NotificationsModule.Actions.ShowNotification.dispatch(
            dispatch,
            createErrorNotification(`Could not authenticate: ${errorMsg}`),
        );
    }
}

/**
 *
 * Export of actions
 */
export const actions: ActionTree<Me.State, Me.State> = {
    [Me.Actions.initialize]: Initialize.initialize,
    [Me.Actions.logout]: Logout.logout,
    [PrivateActions.EnsureAccountRegistered.name]: EnsureAccountRegistered.ensureAccountRegistered,
};

/**
 *
 * Helper functions
 */

function createErrorNotification(message: string): NotificationsModule.Notification {
    return {
        message,
        timeoutMs: 8000,
        params: { color: "error" },
    };
}
