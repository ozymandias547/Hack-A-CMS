var React = require('react');

module.exports.register = function(Vivid) {



    Vivid.registerLayout({
        name: "admin/LayoutOneColumn",
        component: require("./layout/LayoutOneColumn/LayoutOneColumn.jsx")(Vivid)  // TODO: Research ability to not need dependency injection for ecosystem files
    });

    Vivid.registerLayout({
        name: "admin/LayoutTopBarRightMenu",
        component: require("./layout/LayoutTopBarRightMenu/LayoutTopBarRightMenu.jsx")(Vivid)
    });

    Vivid.registerComponent({
        name: "admin/RouteManagerComponent",
        component: require("./component/RouteManagerComponent/RouteManagerComponent.jsx")
    });

    Vivid.registerComponent({
        name: "admin/AdminNavComponent",
        component: require("./component/AdminNavComponent/AdminNavComponent.jsx")
    });

    Vivid.registerComponent({
        name: "admin/RouteDescriptionComponent",
        component: require("./component/RouteDescription/RouteDescriptionComponent.jsx")
    });

    Vivid.registerComponent({
        name: "admin/TopBar",
        component: require("./component/TopBar/TopBarComponent.jsx")
    });

    Vivid.registerComponent({
        name: "admin/RouteHistory",
        component: require("./component/RouteHistory/RouteHistory.jsx")
    });

    Vivid.registerDataSource({
        name: "core/routes",
        url: "http://localhost:8000/api/core/routes"
    })

};

module.exports.addRoutes = function(Vivid) {

    Vivid.route({
        urls: ["/", "/admin"],
        name: "admin/routes",
        layout: "admin/LayoutTopBarRightMenu",
        resolve: [
            {
                datasource: "core/routes"
            }
        ],
        pageLayout: {

            topBar : [
                {
                    name: "admin/TopBar",
                    type: "component"
                }
            ],
            rightMenu : [
                {
                    name: "admin/AdminNavComponent",
                    type: "component"
                },
                {
                    name: "admin/RouteHistory",
                    type: "component"
                }
            ],
            content : [
                {
                    name: "admin/RouteManagerComponent",
                    type: "component"
                }
            ]
        }
    });

    Vivid.route({
        urls: ["/config"],
        name: "admin/config",
        layout: "admin/LayoutTopBarRightMenu",
        resolve: [
            {
                datasource: "core/routes"
            }
        ],
        pageLayout: {
            topBar : [
                {
                    name: "admin/TopBar",
                    type: "component"
                }
            ],
            rightMenu : [
                {
                    name: "admin/AdminNavComponent",
                    type: "component"
                }
            ],
            content : [
                {
                    name: "admin/RouteDescriptionComponent",
                    type: "component"
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
        urls: ["/users"],
        name: "admin/users",
        layout: "admin/LayoutTopBarRightMenu",
        resolve: [],
        pageLayout: {
            topBar : [
                {
                    name: "admin/TopBar",
                    type: "component"
                }
            ],
            rightMenu : [
                {
                    name: "admin/AdminNavComponent",
                    type: "component"
                }
            ],
            content : [
                {
                    name: "admin/RouteDescriptionComponent",
                    type: "component"
                }
            ]
        }
    });

};
