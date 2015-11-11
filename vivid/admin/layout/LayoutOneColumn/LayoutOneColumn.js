var React = require('react');
var _ = require('underscore');

var LayoutOneColumn = React.createClass({
    render: function() {

        var vivid = require('../../../index.js');
        var pageLayout = this.props.pageLayout;
        var pageData = this.props.data;
        var content = [];

        for (var i in pageLayout) {
            if (i === "content") {

                pageLayout[i].forEach(function(part) {

                    if (part.type === "article") {

                        content.push(React.createElement("div", {
                            className: "content",
                            dangerouslySetInnerHTML: {
                                __html: pageData.welcomeArticle
                            }
                        }))

                    }

                    if (part.type === "component") {

                        var Component = _.findWhere(vivid._components, {name: part.name}).component;
                        content.push(React.createElement(Component));

                    }

                })

            }
        }

        return require('./LayoutOneColumn.jsx').call(this, pageData, content);

    }
});



module.exports = LayoutOneColumn;
