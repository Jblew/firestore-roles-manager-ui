// tslint:disable:max-classes-per-file

import { ow_catch } from "@/util/util";
import ow from "ow";
import { CombinedVueInstance } from "vue/types/vue";
import { Action as VuexAction, ActionContext as VuexActionContext, Dispatch } from "vuex";

type ActionFn = VuexAction<RolesModule.State, RolesModule.State>;
type ActionContext = VuexActionContext<RolesModule.State, RolesModule.State>;

export namespace RolesModule {
    export const modulePathName = "roles";
    export function localName(name: string) {
        return modulePathName + "_" + name;
    }

    /**
     * State
     */
    export interface State {
        role: string;
        state: {
            loading: boolean;
            error: string;
        };
        data: {
            loadedForRole: string;
            accounts: AccountLoaderRow[];
        };
    }

    export namespace State {
        export function validate(state: State) {
            ow(state.role, "state.role", ow.string.nonEmpty);

            ow(state.state, "state.state", ow.object);
            ow(state.state.loading, "state.state.loading", ow.boolean);
            ow(state.state.error, "state.state.error", ow.string);

            ow(state.data, "state.data", ow.object);
            ow(state.data.loadedForRole, "state.data.loadedForRole", ow.string);
            ow(
                state.data.accounts,
                "state.data.requestingAccounts",
                ow.array.ofType(ow.object.is(v => ow_catch(() => AccountLoaderRow.validate(v as AccountLoaderRow)))),
            );
        }
    }

    /**
     * Actions
     */
    export namespace Actions {
        export namespace ReloadAccounts {
            export const name = localName("reloadAccounts");
            export interface Payload {
                role: string;
            }
            export type Declaration = ActionFn & ((c: ActionContext, p: Payload) => void);

            export function dispatch(dispatchFn: Dispatch, payload: Payload) {
                return dispatchFn(name, payload);
            }
        }
    }

    /**
     * Getters
     */
    export class Getters {}

    /**
     * AccountRow
     */
    export interface AccountLoaderRow {
        uid: string;
        loading: boolean;
        error: string;
        email: string;
        displayName: string;
        requesting: boolean;
    }

    export namespace AccountLoaderRow {
        export function validate(n: AccountLoaderRow) {
            ow(n.uid, "AccountLoaderRow.uid", ow.string.nonEmpty);
            ow(n.loading, "AccountLoaderRow.loading", ow.boolean);
            ow(n.error, "AccountLoaderRow.error", ow.string);
            ow(n.email, "AccountLoaderRow.email", ow.string);
            ow(n.displayName, "AccountLoaderRow.displayName", ow.string);
            ow(n.requesting, "AccountLoaderRow.requesting", ow.boolean);
        }
    }

    /**
     * State tye guard
     */
    export function stateOf(vueInstance: CombinedVueInstance<any, any, any, any, any>): State {
        return vueInstance.$store.state[modulePathName];
    }
}
