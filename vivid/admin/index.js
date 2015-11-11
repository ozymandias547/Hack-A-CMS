var express = require('express');
var React = require('react');

module.exports = function(vivid) {

    vivid.addLayout({
        name: "admin/LayoutOneColumn", 
        component: require("./layout/LayoutOneColumn/LayoutOneColumn.js"),
        contract: {
            slot1: {
                required: false
            }
        }
    });

    vivid.addComponent({
        name: "admin/RouteManagerComponent",
        component: require("./component/RouteManagerComponent/RouteManagerComponent.js"),
        data: ["routes"]
    });

    vivid.addRoute({
        url: "/",
        name: "admin/routes",
        layout: "admin/LayoutOneColumn",
        pageLayout: {
            content: [
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
                }
            ]
        }
    });


};
