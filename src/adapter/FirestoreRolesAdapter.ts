// tslint:disable member-ordering
import firebase from "firebase/app";
import FirestoreRoles, { AccountRecord } from "firestore-roles";
import * as _ from "lodash";

import { Configuration } from "../config/Configuration";

export class FirestoreRolesAdapter {
    private firestoreRoles: FirestoreRoles;
    private availableRoles: string[];

    private constructor() {
        this.firestoreRoles = new FirestoreRoles(Configuration.get().roles, firebase.firestore());
        this.availableRoles = _.keys(Configuration.get().roles.roles);
    }

    /*public roles(): FirestoreRoles {
        return this.firestoreRoles;
    }*/

    public getAvailableRoles(): string[] {
        return this.availableRoles;
    }

    public isAvailableRole(role: string) {
        return this.availableRoles.indexOf(role) >= 0;
    }

    public async userExists(uid: string) {
        return await this.firestoreRoles.userExists(uid);
    }

    public async registerUser(userInfo: firebase.UserInfo) {
        const account: AccountRecord = {
            uid: userInfo.uid,
            displayName: userInfo.displayName,
            email: userInfo.email,
            providerId: userInfo.providerId,
            phoneNumber: null, // skip phone number in db
            photoURL: userInfo.photoURL,
        };
        return await this.firestoreRoles.registerUser(account);
    }

    public async getUidsInRole(role: string) {
        return await this.firestoreRoles.getUidsInRole(role);
    }

    public async getUidsRequestingRole(role: string) {
        return await this.firestoreRoles.getUidsRequestingRole(role);
    }

    /**
     *
     * Singleton
     */
    public static getInstance() {
        return (FirestoreRolesAdapter.INSTANCE = FirestoreRolesAdapter.INSTANCE || new FirestoreRolesAdapter());
    }

    private static INSTANCE: FirestoreRolesAdapter | undefined;
}
