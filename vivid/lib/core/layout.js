var React = require('react');
var _ = require('underscore');

module.exports.createBlockContent = function(name, props) {

    var content = [];
    var _this = this;

    for (var i in props.appStore.pageLayout) {
        if (i === name) {

            props.appStore.pageLayout[i].forEach(function(part) {

                if (part.type === "article") {
                    content.push(React.createElement("div", {
                        className: "content",
                        dangerouslySetInnerHTML: {
                            __html: props.appStore[part.name]
                        }
                    }));
                }

                if (part.type === "component") {
                    var Component = _.findWhere(_this.components, {name: part.name});
                    content.push(React.createElement(Component.component, props));
                }

            })

        }
    }

    return content;

};


