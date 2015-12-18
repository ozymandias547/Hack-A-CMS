var React = require('react');

var EditableText = React.createClass({

    render: function() {
        return (
            <div>
                {this.props.isEditing ? (
                    <div onClick={this.onToggleEdit}>{this.props.url} is editing</div>
                ) : (
                    <div onClick={this.onToggleEdit}>{this.props.url} isn't editing.</div>
                )}
            </div>
        )
    },

    onToggleEdit: function(e) {

        this.props.dispatch({
            type: "URL_IS_EDITING",
            componentId: this.props.componentId,
            id: this.props.id
        })
    }

});

function reducer (props, action) {

    action.onAction("@@redux/INIT changePage", function() {
       props.isEditing = false;
    });

    action.onActionFromThisComponent("URL_IS_EDITING", function() {
        props.isEditing = !props.isEditing;
    }, props);

    return props;
}

module.exports = EditableText;
module.exports.reducer = reducer;