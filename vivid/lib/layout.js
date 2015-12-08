var React = require('react');
var _ = require('underscore');

//TODO: Define this method with comments
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
                        key: part.uuid,
                        dangerouslySetInnerHTML: {
                            __html: currentPageData[part.name]
                        }
                    }));
                }

                    if (part.type === "component") {
                    var Component = _this.components[part.name];

                    content.push(React.createElement(
                        Component.component, { component: currentPageData.components[part.uuid], key: part.uuid, dispatch: props.dispatch, componentId: part.uuid, page: props.pages[props.currentUrl], currentUrl: props.currentUrl }
                    ));

                }
            })
        }
    }

    return content;

};

