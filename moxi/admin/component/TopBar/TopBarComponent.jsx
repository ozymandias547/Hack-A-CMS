var React = require('react');

if (typeof window !== "undefined") {
    require('./TopBarComponent.scss');
}

module.exports.component = React.createClass({

    render: function() {

        return (
            <div className="TopBarComponent">
                <div className="title">MOXI</div>
                <input type="text" placeholder="Search Routes" className="searchbar" onChange={this.onInputChange} value={this.props.component.currentFilter}/>
                <a href="/" className="page-link" data-internal-link>
                    routes
                </a>
                <a href="/config" className="page-link" data-internal-link>
                    config
                </a>
                <a href="/users" className="page-link" data-internal-link>
                    users
                </a>
            </div>
        );;
    },

    onInputChange: function(e) {
        this.props.dispatch({ type: "TOP_BAR_INPUT_CHANGE", sendToAllComponentsOnPage: true, filterByString: e.target.value})
    }

});


module.exports.reducer = function(state, action) {

    switch(action.type) {
        case "@@redux/INIT":
            state.currentFilter = "";

            break;
        case "TOP_BAR_INPUT_CHANGE":
            state.currentFilter = action.filterByString;
    }

    return state;
};


