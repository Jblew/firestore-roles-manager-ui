// tslint:disable member-ordering no-console
import * as _ from "lodash";
import ow from "ow--fork-by-jblew-with-catching";

import { FirestoreRolesAdapter } from "../adapter/FirestoreRolesAdapter";
import { Configuration } from "../config/Configuration";

export class FirestoreRolesHelper {
    private constructor() {}

    public static acceptRoleRequest(uid: string, role: string, callback: (error?: string) => void) {
        FirestoreRolesHelper.wrapAsync(() => FirestoreRolesHelper.doAcceptRoleRequest(uid, role), callback);
    }

    public static rejectRoleRequest(uid: string, role: string, callback: (error?: string) => void) {
        FirestoreRolesHelper.wrapAsync(() => FirestoreRolesHelper.doRejectRoleRequest(uid, role), callback);
    }

    public static grantRole(uid: string, role: string, callback: (error?: string) => void) {
        FirestoreRolesHelper.wrapAsync(() => FirestoreRolesHelper.doGrantRole(uid, role), callback);
    }

    public static revokeRole(uid: string, role: string, callback: (error?: string) => void) {
        FirestoreRolesHelper.wrapAsync(() => FirestoreRolesHelper.doRevokeRole(uid, role), callback);
    }

    private static async doAcceptRoleRequest(uid: string, role: string) {
        ow(uid, "uid", ow.string.nonEmpty);
        ow(role, "role", ow.string.nonEmpty.oneOf(_.keys(Configuration.get().roles.roles)));

        await FirestoreRolesAdapter.getInstance().enableRole(uid, role);
        await FirestoreRolesAdapter.getInstance().removeRoleRequest(uid, role);
    }

    private static async doRejectRoleRequest(uid: string, role: string) {
        ow(uid, "uid", ow.string.nonEmpty);
        ow(role, "role", ow.string.nonEmpty.oneOf(_.keys(Configuration.get().roles.roles)));

        await FirestoreRolesAdapter.getInstance().removeRoleRequest(uid, role);
    }

    private static async doGrantRole(uid: string, role: string) {
        ow(uid, "uid", ow.string.nonEmpty);
        ow(role, "role", ow.string.nonEmpty.oneOf(_.keys(Configuration.get().roles.roles)));

        await FirestoreRolesAdapter.getInstance().enableRole(uid, role);
    }

    private static async doRevokeRole(uid: string, role: string) {
        ow(uid, "uid", ow.string.nonEmpty);
        ow(role, "role", ow.string.nonEmpty.oneOf(_.keys(Configuration.get().roles.roles)));

        await FirestoreRolesAdapter.getInstance().disableRole(uid, role);
    }

    private static wrapAsync(asyncFn: () => Promise<void>, callback: (error?: string) => void) {
        (async () => {
            try {
                await asyncFn();
                callback();
            } catch (error) {
                console.error(error);
                callback(error.message ? error.message : error);
            }
        })();
    }
}
