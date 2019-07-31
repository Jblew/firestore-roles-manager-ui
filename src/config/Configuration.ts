import { FirestoreRolesConfiguration } from "firestore-roles";
import ow from "ow";

export interface Configuration {
    firebase: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
    };
    authProviders: string[];
    roles: FirestoreRolesConfiguration;
}

export namespace Configuration {
    export function validate(c: Configuration) {
        ow(c.firebase, "Configuration.firebase", ow.object);
        ow(c.firebase.apiKey, "Configuration.firebase.apiKey", ow.string.nonEmpty);
        ow(c.firebase.authDomain, "Configuration.firebase.authDomain", ow.string.nonEmpty);
        ow(c.firebase.databaseURL, "Configuration.firebase.databaseURL", ow.string.url);
        ow(c.firebase.projectId, "Configuration.firebase.projectId", ow.string.nonEmpty);

        FirestoreRolesConfiguration.validate(c.roles, "Configuration.roles ");
    }

    export function load(): Configuration {
        if (!window.ROLES_CONFIGURATION) throw new Error("You must set the window.ROLES_CONFIGURATION env");
        return window.ROLES_CONFIGURATION;
    }
}

declare global {
    interface Window {
        ROLES_CONFIGURATION: Configuration;
    }
}
