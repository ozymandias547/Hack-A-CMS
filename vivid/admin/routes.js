var express = require('express');
var adminRouter = express.Router();
var React = require('react');

exports = module.exports = function(vivid) {

    // layouts and components should be bootstrapped on init. that way they are preregistered and ready to go.
    // The above method "renderPipeline" will return a rendered page based upon the route data found.
    // The data in the above object will be munged by the different collections for dynamic pages, but hardcoded here for built-in functionality.

    //vivid.addPage({
    //    match: "/admin/",
    //    layout: 'admin/layout/header-with-right-sidebar',
    //    sections: {
    //        header : [
    //            {
    //                type: "component",
    //                name: "admin/component/header"
    //            }
    //        ]
    //    }
    //});

    adminRouter.get("/", function(req, res) {

        var PageComponent = require('./page/splash.jsx');
        var pageComponent = React.createElement(PageComponent, { name: vivid._options.name });

        res.send(React.renderToString(pageComponent));

    });

    return adminRouter;

};
