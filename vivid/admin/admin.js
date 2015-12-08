var React = require('react');
var uuid = require('uuid');

// TODO: Research ability to not need dependency injection for ecosystem files - better to just have a pre-bound (this)?
module.exports.register = function(Vivid) {

    Vivid.registerLayout({
        name: "admin/LayoutOneColumn",
        component: require("./layout/LayoutOneColumn/LayoutOneColumn.jsx")(Vivid)
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

};

module.exports.addRoutes = function(Vivid) {

    Vivid.route({
        url: "/",
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
                    type: "component",
                    //TODO: make uuid creation part of the framework, not part of the API
                    uuid: uuid.v4()
                }
            ],
            rightMenu : [
                {
                    name: "admin/AdminNavComponent",
                    type: "component",
                    uuid: uuid.v4()
                }
            ],
            content : [
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
        layout: "admin/LayoutTopBarRightMenu",
        resolve: [
            {
                name: "configData"
            }
        ],
        pageLayout: {
            topBar : [
                {
                    name: "admin/TopBar",
                    type: "component",
                    uuid: uuid.v4()
                }
            ],
            rightMenu : [
                {
                    name: "admin/AdminNavComponent",
                    type: "component",
                    uuid: uuid.v4()
                }
            ],
            content : [
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
        layout: "admin/LayoutTopBarRightMenu",
        resolve: [
            {
                name: "userData"
            }
        ],
        pageLayout: {
            topBar : [
                {
                    name: "admin/TopBar",
                    type: "component",
                    uuid: uuid.v4()
                }
            ],
            rightMenu : [
                {
                    name: "admin/AdminNavComponent",
                    type: "component",
                    uuid: uuid.v4()
                }
            ],
            content : [
                {
                    name: "admin/RouteDescriptionComponent",
                    type: "component",
                    uuid: uuid.v4()
                }
            ]
        }
    });

};
