import { FirebaseAuthHelper } from "@/helper/FirebaseAuthHelper";
import ow from "ow";
import { MutationTree } from "vuex";

import { AuthModule as Me } from "./AuthModule";
import { Mutations } from "./Mutations";

const setUser: Mutations.SetUser.Declaration = (state: Me.State, payload: { user: FirebaseAuthHelper.User }) => {
    ow(payload.user, "payload.user", ow.object);
    const user = payload.user;
    state.username = user.displayName ? user.displayName : "";
    state.uid = user.uid;
    state.profileImageURL = user.photoURL ? user.photoURL : "";
    Me.validateState(state);
};

const resetUser: Mutations.ResetUser.Declaration = (state: Me.State) => {
    state.username = undefined;
    state.profileImageURL = undefined;
    Me.validateState(state);
};

const setState: Mutations.SetState.Declaration = (state: Me.State, payload: { state: Me.AuthState }) => {
    ow(payload, "payload", ow.object);
    ow(
        payload.state,
        "payload.state",
        ow.string.oneOf([Me.AuthState.LOADING, Me.AuthState.AUTHENTICATED, Me.AuthState.NOTAUTHENTICATED]),
    );
    state.state = payload.state;
    Me.validateState(state);
};

export const mutations: MutationTree<Me.State> = {
    [Mutations.SetUser.name]: setUser,
    [Mutations.ResetUser.name]: resetUser,
    [Mutations.SetState.name]: setState,
};
