import { RolesModule as Me } from "./RolesModule";

export const state: Me.State = {
    role: "",
    state: {
        loading: false,
        error: "",
    },
    data: {
        loadedForRole: "",
        accounts: [],
    },
    accountCache: {},
};

Me.State.validate(state);
