var express = require('express');
var React = require('react');

module.exports.register = function(vivid) {

    vivid.addLayout({
        name: "admin/LayoutOneColumn",
        component: require("./layout/LayoutOneColumn/LayoutOneColumn.jsx"),
        contract: {
            content1: {
                required: false
            }
        }
    });

    vivid.addComponent({
        name: "admin/RouteManagerComponent",
        component: require("./component/RouteManagerComponent/RouteManagerComponent.jsx"),
        data: ["routes"]
    });

    vivid.addComponent({
        name: "admin/AdminNavComponent",
        component: require("./component/AdminNavComponent/AdminNavComponent.jsx"),
        data: []
    });

};

module.exports.addRoutes = function(vivid) {

    vivid.addRoute({
        url: "/",
        name: "admin/routes",
        layout: "admin/LayoutOneColumn",
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
                }
            ]
        },
        data: {
            meta: {
                title: "Boo!"
            },
            welcomeArticle: "<strong>Welcome to Vivid CMS!</strong>",
            routes: [
                {
                    name: "Blog post 1",
                    text: "WOOOOOT"
                },
                {
                    name: "Blog post 2",
                    text: "WOOOOOT"
                },
                {
                    name: "Blog post 3",
                    text: "WOOOOOT"
                },
                {
                    name: "Blog post 4",
                    text: "WOOOOOT"
                }
            ]
        }
    });


    vivid.addRoute({
        url: "/config",
        name: "admin/config",
        layout: "admin/LayoutOneColumn",
        pageLayout: {
            content1: [
                {
                    name: "admin/AdminNavComponent",
                    type: "component"
                },
                {
                    name: "welcomeArticle",
                    type: "article"
                }
            ]
        },
        data: {
            meta: {
                title: "Boo!"
            },
            welcomeArticle: "<strong>Config</strong>"
        }
    });

    vivid.addRoute({
        url: "/route-layout/*",
        name: "admin/route-layout",
        layout: "admin/LayoutOneColumn",
        pageLayout: {
            content1: [
                {
                    name: "admin/AdminNavComponent",
                    type: "component"
                },
                {
                    name: "welcomeArticle",
                    type: "article"
                }
            ]
        },
        data: {
            welcomeArticle: "<strong>Route layout</strong>",
            meta: {
                title: "Route Layouts"
            }
        }
    });


};
