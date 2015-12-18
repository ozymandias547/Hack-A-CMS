var React = require('react');

var EditableText = React.createClass({

    render: function() {
        return (
            <div>
                {this.props.isEditing ? (
                    <input type="text" onKeyUp={this.onInputKeyUp} defaultValue={this.props.url} autofocus ref={function(input) {
                        if (input != null) {
                            input.setSelectionRange(0,input.value.length);
                        }
                    }}/>
                ) : (
                    <div onClick={this.onStartEditing}>{this.props.url}</div>
                )}
            </div>
        )
    },

    onStartEditing: function(e) {
        this.props.dispatch({
            type: "EDITABLE_TEXT_START_EDITING",
            componentId: this.props.componentId,
            id: this.props.id
        })
    },

    onInputKeyUp: function(e) {

        if (e.which === 13) {
            this.props.dispatch({
                type: "EDITABLE_TEXT_NEW_CHANGES",
                componentId: this.props.componentId,
                id: this.props.id,
                newValue: e.currentTarget.value
            })
        }
    }

});

function reducer (props, action) {

    action.onAction("@@redux/INIT changePage BODY_CLICK", function() {
       props.isEditing = false;
    });

    action.onAction("BODY_CLICK", function() {
        props.isEditing = false;
    });

    action.onActionFromThisComponent("EDITABLE_TEXT_START_EDITING", function() {
        props.isEditing = !props.isEditing;
    }, props);

    action.onActionFromThisComponent("EDITABLE_TEXT_NEW_CHANGES", function() {
        props.isEditing = false;
        props.url = action.newValue;
    }, props);

    return props;
}

module.exports = EditableText;
module.exports.reducer = reducer;