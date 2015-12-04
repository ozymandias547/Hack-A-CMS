var React = require('react');
var uuid = require('uuid');

module.exports.register = function(Vivid) {

    Vivid.registerLayout({
        name: "admin/LayoutOneColumn",
        component: require("./layout/LayoutOneColumn/LayoutOneColumn.jsx")(Vivid)
    });

    Vivid.registerComponent({
        name: "admin/RouteManagerComponent",
        component: require("./component/RouteManagerComponent/RouteManagerComponent.jsx").component(Vivid),
        reducer: require("./component/RouteManagerComponent/RouteManagerComponent.jsx").reducer
    });

    Vivid.registerComponent({
        name: "admin/AdminNavComponent",
        component: require("./component/AdminNavComponent/AdminNavComponent.jsx")(Vivid)
    });

    Vivid.registerComponent({
        name: "admin/RouteDescriptionComponent",
        component: require("./component/RouteDescription/RouteDescriptionComponent.jsx")(Vivid)
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
                    type: "component",
                    uuid: uuid.v4()
                },
                {
                    name: "welcomeArticle",
                    type: "article",
                    uuid: uuid.v4()
                },
                {
                    name: "admin/RouteManagerComponent",
                    type: "component",
                    uuid: uuid.v4()
                },
                {
                    name: "admin/RouteManagerComponent",
                    type: "component",
                    uuid: uuid.v4()
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
                    type: "component",
                    uuid: uuid.v4()
                },
                {
                    name: "configArticle",
                    type: "article",
                    uuid: uuid.v4()
                },
                {
                    name: "admin/RouteDescriptionComponent",
                    type: "component",
                    uuid: uuid.v4()
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
                    type: "component",
                    uuid: uuid.v4()
                },
                {
                    name: "admin/RouteDescriptionComponent",
                    type: "component",
                    uuid: uuid.v4()
                }
            ]
        }
    });

};
