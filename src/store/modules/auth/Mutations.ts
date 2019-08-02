import { Commit, Mutation as VuexMutation } from "vuex";

import { FirebaseAuthHelper } from "../../../helper/FirebaseAuthHelper";

import { AuthModule as Me } from "./AuthModule";

type MutationFn = VuexMutation<Me.State>;

export namespace Mutations {
    export namespace SetUser {
        export const name = Me.localName("setUser");

        export interface Payload {
            user: FirebaseAuthHelper.User;
        }
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }

    export namespace ResetUser {
        export const name = Me.localName("resetUser");

        export type Declaration = MutationFn & ((state: Me.State) => void);

        export function commit(commitFn: Commit) {
            return commitFn(name);
        }
    }

    export namespace SetState {
        export const name = Me.localName("setUser");

        export interface Payload {
            state: Me.AuthState;
        }
        export type Declaration = MutationFn & ((state: Me.State, payload: Payload) => void);

        export function commit(commitFn: Commit, payload: Payload) {
            return commitFn(name, payload);
        }
    }
}
