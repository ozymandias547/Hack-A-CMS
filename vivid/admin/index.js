var express = require('express');
var React = require('react');

module.exports = function(vivid) {

    vivid.addLayout({
        name: "admin/LayoutOneColumn", 
        component: require("./component/LayoutOneColumn/LayoutOneColumn.jsx"),
        contract: {
            slot1: {
                required: false
            }
        }
    });

    vivid.addPageLayout({
        name: "admin/routes",
        layout: "admin/LayoutOneColumn",
        slots: {
            slot1: "Welcome!"
        }
    });

    vivid.addRoute({
        url: "/",
        pageLayout: "admin/routes",
        data: {
            meta: {
                title: "Vivid CMS: Routes"
            }
        }
    });


};
