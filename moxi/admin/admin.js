var React = require('react');

module.exports.register = function(Moxi) {



    Moxi.registerLayout({
        name: "admin/LayoutOneColumn",
        component: require("./layout/LayoutOneColumn/LayoutOneColumn.jsx")(Moxi)  // TODO: Research ability to not need dependency injection for ecosystem files
    });

    Moxi.registerLayout({
        name: "admin/LayoutTopBarRightMenu",
        component: require("./layout/LayoutTopBarRightMenu/LayoutTopBarRightMenu.jsx")(Moxi)
    });

    Moxi.registerLayout({
        name: "admin/LayoutTopBar",
        component: require("./layout/LayoutTopBar/LayoutTopBar.jsx")(Moxi)
    });

    Moxi.registerComponent({
        name: "admin/RouteManagerComponent",
        component: require("./component/RouteManagerComponent/RouteManagerComponent.jsx")
    });

    Moxi.registerComponent({
        name: "admin/AdminNavComponent",
        component: require("./component/AdminNavComponent/AdminNavComponent.jsx")
    });

    Moxi.registerComponent({
        name: "admin/RouteDescriptionComponent",
        component: require("./component/RouteDescription/RouteDescriptionComponent.jsx")
    });

    Moxi.registerComponent({
        name: "admin/TopBar",
        component: require("./component/TopBar/TopBarComponent.jsx")
    });

    Moxi.registerComponent({
        name: "admin/RouteHistory",
        component: require("./component/RouteHistory/RouteHistory.jsx")
    });

    Moxi.registerDataSource({
        name: "core/routes",
        deps: {},
        server: {
            middleware: function(deps, next, error) {
                next(this.routes);
            }
        },
        browser: {
            middleware: function(deps, next, error) {

                var request = require('browser-request');

                request({
                    method:'GET',
                    url:"http://localhost:8000/api/core/routes",
                    json:true
                }, function(er, response, body) {
                    next(body);
                });

            }
        }
    });

    Moxi.registerDataSource({
        name: "core/route",
        deps: {
            routeName: {
                type: "string",
                description: "The route name"
            }
        },
        server: {
            middleware: function(deps, next, error) {
                next(this.routes[deps.routeName]);
            }
        },
        browser: {
            middleware: function(deps, next, error) {

                var request = require('browser-request');

                request({
                    method:'GET',
                    url: 'http://localhost:8000/api/core/routes/' + decodeURIComponent(deps.routeName),
                    json:true
                }, function(er, response, body) {
                    next(body);
                });

            }
        }
    });

};

module.exports.addRoutes = function(Moxi) {

    Moxi.route({
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

    Moxi.route({
        urls: ["/page-layout/:name"],
        name: "admin/pagelayout",
        layout: "admin/LayoutTopBarRightMenu",
        resolve: [
            {
                datasource: "core/route",
                dataSourceDeps: {
                    routeName: {
                        type: "param",
                        name: "name"
                    }
                }
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

            ],
            content : [

            ]
        }
    });

    Moxi.route({
        urls: ["/config"],
        name: "admin/config",
        layout: "admin/LayoutTopBar",
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

    Moxi.route({
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
