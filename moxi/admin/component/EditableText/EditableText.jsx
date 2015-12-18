var React = require('react');

var EditableText = React.createClass({

    render: function() {
        return (
            <div>
                {this.props.isEditing ? (
                    <input type="text" defaultValue={this.props.url} autofocus ref={function(input) {
                        if (input != null) {
                            input.setSelectionRange(0,input.value.length);
                        }
                    }}/>
                ) : (
                    <div onClick={this.onToggleEdit}>{this.props.url}</div>
                )}
            </div>
        )
    },

    onToggleEdit: function(e) {

        this.props.dispatch({
            type: "URL_IS_EDITING",
            id: this.props.id
        })
    }

});

function reducer (props, action) {

    action.onAction("@@redux/INIT changePage URL_IS_EDITING BODY_CLICK", function() {
       props.isEditing = false;
    });

    action.onActionFromThisComponent("URL_IS_EDITING", function() {
        props.isEditing = !props.isEditing;
    }, props);

    return props;
}

module.exports = EditableText;
module.exports.reducer = reducer;