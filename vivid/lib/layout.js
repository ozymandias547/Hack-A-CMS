var React = require('react');
var _ = require('underscore');

module.exports.createBlockContent = function(name, props) {

    var content = [];
    var _this = this;
    var currentPageData = props.pages[props.currentUrl];

    for (var i in currentPageData.pageLayout) {
        if (i === name) {

            currentPageData.pageLayout[i].forEach(function(part) {

                if (part.type === "article") {
                    content.push(React.createElement("div", {
                        className: "article " + part.name,
                        dangerouslySetInnerHTML: {
                            __html: currentPageData[part.name]
                        },
                        key: currentPageData[part.name]
                    }));
                }

                if (part.type === "component") {
                    var Component = _.findWhere(_this.components, {name: part.name});
                    content.push(React.createElement(
                        Component.component, props
                    ));

                }
            })
        }
    }

    return content;

};

