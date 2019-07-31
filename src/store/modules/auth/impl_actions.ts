// tslint:disable no-console
import { FirebaseAuthHelper } from "@/helper/FirebaseAuthHelper";
import { Action as VuexAction, ActionTree } from "vuex";

import { NotificationsModule } from "../notifications/NotificationsModule";

import { AuthModule as Me } from "./AuthModule";
import { Mutations } from "./Mutations";

type ActionFn = VuexAction<Me.State, Me.State>;

const initialize: ActionFn = ({ commit, dispatch }) => {
    FirebaseAuthHelper.initialize({
        authenticatedCb: user => {
            console.log("Authenticated user", user);
            commit(Mutations.setUser, { user: user as FirebaseAuthHelper.User });
            commit(Mutations.setState, { state: Me.AuthState.AUTHENTICATED });
        },
        notAuthenticatedCb: () => {
            console.log("User not authenticated");
            commit(Mutations.setState, { state: Me.AuthState.NOTAUTHENTICATED });
        },
        errorCb: (msg: string) => {
            commit(Mutations.setState, { state: Me.AuthState.NOTAUTHENTICATED });

            NotificationsModule.Actions.ShowNotification.dispatch(
                dispatch,
                createErrorNotification(`Could not authenticate: ${msg}`),
            );
        },
    });
};

const logout: ActionFn = ({ commit }) => {
    commit(Mutations.setState, { state: Me.AuthState.LOADING });
    (async () => {
        await FirebaseAuthHelper.signOut();
        commit(Mutations.resetUser);
        commit(Mutations.setState, { state: Me.AuthState.NOTAUTHENTICATED });
    })();
};

export const actions: ActionTree<Me.State, Me.State> = {
    [Me.Actions.initialize]: initialize,
    [Me.Actions.logout]: logout,
};

/**
 * Helper functions
 */

function createErrorNotification(message: string): NotificationsModule.Notification {
    return {
        message,
        timeoutMs: 8000,
        params: { color: "error" },
    };
}
