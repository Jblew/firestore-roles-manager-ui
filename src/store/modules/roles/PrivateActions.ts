export namespace PrivateActions {}
import { Action as VuexAction, ActionContext as VuexActionContext, Dispatch } from "vuex";

import { RolesModule as Me } from "./RolesModule";

type ActionFn = VuexAction<Me.State, Me.State>;
type ActionContext = VuexActionContext<Me.State, Me.State>;

export namespace PrivateActions {
    export namespace EnsureAccountInCache {
        export const name = Me.localName("ensureAccountInCache");

        export type Payload = string;
        export type Declaration = ActionFn & ((c: ActionContext, uid: Payload) => void);

        export function dispatch(dispatchFn: Dispatch, payload: Payload) {
            return dispatchFn(name, payload);
        }
    }

    export namespace ReloadIfRoleNotChanged {
        export const name = Me.localName("reloadIfRoleNotChanged");

        export interface Payload {
            role: string;
        }
        export type Declaration = ActionFn & ((c: ActionContext, uid: Payload) => void);

        export function dispatch(dispatchFn: Dispatch, payload: Payload) {
            return dispatchFn(name, payload);
        }
    }
}
