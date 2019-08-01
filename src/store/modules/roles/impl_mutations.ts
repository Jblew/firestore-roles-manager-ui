import ow from "ow";
import { MutationTree } from "vuex";

import { Mutations } from "./Mutations";
import { RolesModule as Me } from "./RolesModule";

const setRole: Mutations.SetRole.Declaration = (state: Me.State, payload: string) => {
    ow(payload, "payload", ow.string);

    state.role = payload;

    Me.State.validate(state);
};

const setState: Mutations.SetState.Declaration = (state: Me.State, payload: { loading: boolean; error: string }) => {
    ow(payload.loading, "payload.loading", ow.boolean);
    ow(payload.error, "payload.error", ow.string);

    state.state.loading = payload.loading;
    state.state.error = payload.error;

    Me.State.validate(state);
};

const setData: Mutations.SetData.Declaration = (
    state: Me.State,
    payload: {
        loadedForRole: string;
        accounts: Me.AccountLoaderRow[];
    },
) => {
    ow(payload.loadedForRole, "payload.loadedForRole", ow.string);
    ow(payload.accounts, "payload.accounts", ow.array.ofType(ow.object));

    state.data.loadedForRole = payload.loadedForRole;
    state.data.accounts = payload.accounts;

    Me.State.validate(state);
};

const cacheAccount: Mutations.CacheAccount.Declaration = (state: Me.State, payload: Mutations.CacheAccount.Payload) => {
    ow(payload, "payload", ow.object);
    ow(payload.uid, "payload.uid", ow.string.nonEmpty);

    state.accountCache = { ...state.accountCache, [payload.uid]: payload };

    Me.State.validate(state);
};

export const mutations: MutationTree<Me.State> = {
    [Mutations.SetRole.name]: setRole,
    [Mutations.SetState.name]: setState,
    [Mutations.SetData.name]: setData,
    [Mutations.CacheAccount.name]: cacheAccount,
};
