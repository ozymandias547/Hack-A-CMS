var express = require('express');
var React = require('react');

module.exports.register = function(Vivid) {

    Vivid.registerLayout({
        name: "admin/LayoutOneColumn",
        component: require("./layout/LayoutOneColumn/LayoutOneColumn.jsx"),
        contract: {
            content1: {
                required: false
            }
        }
    });

    Vivid.registerComponent({
        name: "admin/RouteManagerComponent",
        component: require("./component/RouteManagerComponent/RouteManagerComponent.jsx"),
        data: ["routes"]
    });

    Vivid.registerComponent({
        name: "admin/AdminNavComponent",
        component: require("./component/AdminNavComponent/AdminNavComponent.jsx"),
        data: []
    });

};

module.exports.addRoutes = function(Vivid) {

    Vivid.route({
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
                title: "Vivid Routes"
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


    Vivid.route({
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
                title: "Vivid Config"
            },
            welcomeArticle: "<strong>Config</strong>"
        }
    });

    Vivid.route({
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
                },
                {
                    name: "randomArticle",
                    type: "article"
                }
            ]
        },
        data: {
            welcomeArticle: "<strong>Route layout</strong>",
            randomArticle: "<strong>Random text</strong>",
            meta: {
                title: "Vivid Route Layouts"
            }
        }
    });


};
