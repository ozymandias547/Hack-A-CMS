var React = require('react');

module.exports.schema = {
    type: "layout",
    sections: [
        {
            name: "header"
        },
        {
            name: "main"
        },
        {
            name: "sidebar"
        }
    ]
};

module.exports.class = React.createClass({

    componentDidMount: function() {
        console.log(Array.isArray(this.props.children)); // => true
    },

    render: function() {
        return <div>{ this.props.children }</div>;
    }

});