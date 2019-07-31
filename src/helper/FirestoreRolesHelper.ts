// tslint:disable member-ordering
import { Configuration } from "@/config/Configuration";
import firebase from "firebase/app";
import FirestoreRoles from "firestore-roles";

export class FirestoreRolesHelper {
    public static roles(): FirestoreRoles {
        return (FirestoreRolesHelper.ROLES_INSTANCE =
            FirestoreRolesHelper.ROLES_INSTANCE || FirestoreRolesHelper.constructRolesInstance());
    }

    private static constructRolesInstance() {
        return new FirestoreRoles(Configuration.get().roles, firebase.firestore());
    }

    private static ROLES_INSTANCE: FirestoreRoles | undefined;
}
