export namespace PrivateActions {}
import { Action as VuexAction, ActionContext as VuexActionContext, Dispatch } from "vuex";

import { FirebaseAuthHelper } from "../../../helper/FirebaseAuthHelper";

import { AuthModule as Me } from "./AuthModule";

type ActionFn = VuexAction<Me.State, Me.State>;
type ActionContext = VuexActionContext<Me.State, Me.State>;

export namespace PrivateActions {
    export namespace EnsureAccountRegistered {
        export const name = Me.localName("ensureAccountRegistered");

        export type Payload = FirebaseAuthHelper.User;
        export type Declaration = ActionFn & ((c: ActionContext, accountRecord: Payload) => void);

        export function dispatch(dispatchFn: Dispatch, payload: Payload) {
            return dispatchFn(name, payload);
        }
    }
}
