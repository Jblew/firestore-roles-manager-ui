window.LOADABLE_ROLES_CONFIGURATION = {
    firebase: {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: ""
    },
    authProviders: ["google.com", "password"],
    roles: {
        accountsCollection: "accounts",
        roleCollectionPrefix: "role_",
        roleRequestsCollectionPrefix: "rolereq_",
        roles: {
            admin: {
                manages: ["manager", "editor", "reviewer"]
            },
            manager: {
                manages: ["editor", "reviewer"]
            },
            editor: {
                manages: []
            },
            reviewer: {
                manages: []
            },
        }
    }
};