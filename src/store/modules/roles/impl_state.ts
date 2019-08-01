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
};

Me.State.validate(state);
