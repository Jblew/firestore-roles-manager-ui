import { Commit, Mutation as VuexMutation } from "vuex";

import { RolesModule as Me } from "./RolesModule";

type MutationFn = VuexMutation<Me.State>;

export namespace Mutations {
    export namespace SetRole {
        export const name = Me.localName("setRole");

        export type Payload = string;
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }

    export namespace SetState {
        export const name = Me.localName("setState");

        export interface Payload {
            loading: boolean;
            error: string;
        }
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }

    export namespace SetData {
        export const name = Me.localName("setData");

        export interface Payload {
            loadedForRole: string;
            accounts: Me.AccountLoaderRow[];
        }

        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }
}
