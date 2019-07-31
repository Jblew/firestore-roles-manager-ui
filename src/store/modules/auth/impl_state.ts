import { AuthModule as Me } from "./AuthModule";

export const state: Me.State = {
    state: Me.AuthState.LOADING,
    profileImageURL: undefined,
    username: undefined,
    uid: "",
};
Me.validateState(state);
