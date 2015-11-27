var React = require('react');
var _ = require('underscore');


var LayoutOneColumn = React.createClass({
    render: function() {

        // Build components array that will go into the blocks of the layout.
        this.blocks = {
            content1 : require('../../../index.js').createBlockContent("content1", this.props)
        };

        return (
            <html>
                <head>
                    <title>{this.props.data.meta.title}</title>
                </head>
                <body>
                    {this.blocks.content1}
                </body>
            </html>
        );

    }
});



module.exports = LayoutOneColumn;
