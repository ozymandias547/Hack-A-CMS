var React = require('react');
var _ = require('underscore');

module.exports.createBlockContent = function(name, props) {

    var content = [];
    var pageLayout = props.pageLayout;
    var pageData = props.data;
    var _this = this;

    for (var i in pageLayout) {
        if (i === name) {

            pageLayout[i].forEach(function(part) {

                if (part.type === "article") {
                    content.push(React.createElement("div", {
                        className: "content",
                        dangerouslySetInnerHTML: {
                            __html: pageData[part.name]
                        }
                    }));
                }

                if (part.type === "component") {

                    var componentData = {};
                    var Component = _.findWhere(_this.components, {name: part.name});

                    Component.data.forEach(function(d) {
                        componentData[d] = pageData[d];
                    });

                    content.push(React.createElement(Component.component, componentData));

                }

            })

        }
    }

    return content;

};


