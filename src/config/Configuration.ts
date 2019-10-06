import { FirestoreRolesConfiguration } from "firestore-roles";
import ow from "ow--fork-by-jblew-with-catching";

export interface Configuration {
    firebase: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
    };
    authProviders: string[];
    roles: FirestoreRolesConfiguration;
    basePath: string;
    title?: string;
    menuLinks?: Configuration.MenuLink[];
}

export namespace Configuration {
    export function validate(c: Configuration) {
        ow(c.firebase, "Configuration.firebase", ow.object);
        ow(c.firebase.apiKey, "Configuration.firebase.apiKey", ow.string.nonEmpty);
        ow(c.firebase.authDomain, "Configuration.firebase.authDomain", ow.string.nonEmpty);
        ow(c.firebase.databaseURL, "Configuration.firebase.databaseURL", ow.string.url);
        ow(c.firebase.projectId, "Configuration.firebase.projectId", ow.string.nonEmpty);

        ow(c.basePath, "Configuration.basePath", ow.string.nonEmpty);
        ow(c.title, "Configuration.title", ow.optional.string.nonEmpty);
        ow(
            c.menuLinks,
            "Configuration.menuLinks",
            ow.any(ow.undefined, ow.array.ofType(ow.object.catching(o => MenuLink.validate(o as MenuLink)))),
        );

        FirestoreRolesConfiguration.validate(c.roles, "Configuration.roles ");
    }

    export function get(): Configuration {
        if (!window.ROLES_CONFIGURATION) throw new Error("You must set the window.ROLES_CONFIGURATION env");
        return window.ROLES_CONFIGURATION;
    }

    export interface MenuLink {
        href: string;
        name: string;
        icon: string;
        target?: string;
    }

    export namespace MenuLink {
        // tslint:disable-next-line no-shadowed-variable
        export function validate(m: MenuLink) {
            ow(m.href, "MenuLink.href", ow.string.nonEmpty);
            ow(m.name, "MenuLink.name", ow.string.nonEmpty);
            ow(m.icon, "MenuLink.icon", ow.string.nonEmpty);
            ow(m.target, "MenuLink.target", ow.optional.string.nonEmpty);
        }
    }
}

declare global {
    interface Window {
        ROLES_CONFIGURATION: Configuration;
    }
}
