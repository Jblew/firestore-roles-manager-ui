import { ActionTree } from "vuex";

import { AuthModule } from "../modules/auth/AuthModule";

import { RootStore as Me } from "./RootStore";

export const actions: ActionTree<Me.State, Me.State> = {
    [Me.Actions.initialize]: ({ commit, dispatch, state }): void => {
        dispatch(AuthModule.Actions.initialize);
        setInterval(() => {
            commit(Me.Mutations.updateNowTimer);
        }, 1000);
    },
};
