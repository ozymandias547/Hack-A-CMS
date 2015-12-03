var React = require('react');

module.exports.register = function(Vivid) {

    Vivid.registerLayout({
        name: "admin/LayoutOneColumn",
        component: require("./layout/LayoutOneColumn/LayoutOneColumn.jsx")(Vivid)
    });

    Vivid.registerComponent({
        name: "admin/RouteManagerComponent",
        component: require("./component/RouteManagerComponent/RouteManagerComponent.jsx")
    });

    Vivid.registerComponent({
        name: "admin/AdminNavComponent",
        component: require("./component/AdminNavComponent/AdminNavComponent.jsx")(Vivid)
    });

    Vivid.registerComponent({
        name: "admin/RouteDescriptionComponent",
        component: require("./component/RouteDescription/RouteDescriptionComponent.jsx")
    });

};

module.exports.addRoutes = function(Vivid) {

    Vivid.route({
        url: "/",
        name: "admin/routes",
        layout: "admin/LayoutOneColumn",
        resolve: [
            {
                name: "welcomePageMeta"
            },
            {
                name: "welcomeArticle"
            },
            {
                name: "routes"
            }
        ],
        pageLayout: {
            content1: [
                {
                    name: "admin/AdminNavComponent",
                    type: "component"
                },
                {
                    name: "welcomeArticle",
                    type: "article"
                },
                {
                    name: "admin/RouteManagerComponent",
                    type: "component"
                },
                {
                    name: "admin/RouteManagerComponent",
                    type: "component"
                },
                {
                    name: "admin/RouteDescriptionComponent",
                    type: "component"
                }
            ]
        }
    });

    Vivid.route({
        url: "/config",
        name: "admin/config",
        layout: "admin/LayoutOneColumn",
        resolve: [
            {
                name: "configData"
            }
        ],
        pageLayout: {
            content1: [
                {
                    name: "admin/AdminNavComponent",
                    type: "component"
                },
                {
                    name: "configArticle",
                    type: "article"
                },
                {
                    name: "admin/RouteDescriptionComponent",
                    type: "component"
                }
            ]
        }
    });

    Vivid.route({
        url: "/users",
        name: "admin/users",
        layout: "admin/LayoutOneColumn",
        resolve: [
            {
                name: "userData"
            }
        ],
        pageLayout: {
            content1: [
                {
                    name: "admin/AdminNavComponent",
                    type: "component"
                },
                {
                    name: "admin/RouteDescriptionComponent",
                    type: "component"
                }
            ]
        }
    });

};
