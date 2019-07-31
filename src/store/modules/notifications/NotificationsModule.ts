// tslint:disable:max-classes-per-file

import { ow_catch } from "@/util/util";
import ow from "ow";

export namespace NotificationsModule {
    export const modulePathName = "vnotifications";
    export function localName(name: string) {
        return modulePathName + "_" + name;
    }

    /**
     * State
     */
    export interface State {
        notifications: CommitedNotification[];
    }

    export namespace State {
        export function validate(state: State) {
            ow(
                state.notifications,
                "state.notifications",
                ow.array.ofType(
                    ow.object.is(v => ow_catch(() => CommitedNotification.validate(v as CommitedNotification))),
                ),
            );
        }
    }

    /**
     * Actions
     */
    export class Actions {
        public static showNotification = localName("showNotification");
    }

    /**
     * Getters
     */
    export class Getters {}

    /**
     * Notification
     */
    export interface Notification {
        message: string;
        timeoutMs: number;
        params: any;
    }

    export namespace Notification {
        export function validate(n: Notification) {
            ow(n.message, "Notification.message", ow.string.nonEmpty);
            ow(n.timeoutMs, "Notification.timeoutMs", ow.number.integer.finite.positive);
        }
    }

    /**
     * CommitedNotification
     */
    export interface CommitedNotification {
        message: string;
        timestampGoneMs: number;
        params: any;
    }

    export namespace CommitedNotification {
        export function validate(n: CommitedNotification) {
            ow(n.message, "CommitedNotification.message", ow.string.nonEmpty);
            ow(n.timestampGoneMs, "CommitedNotification.timestampGoneMs", ow.number.integer.finite.positive);
        }
    }
}
