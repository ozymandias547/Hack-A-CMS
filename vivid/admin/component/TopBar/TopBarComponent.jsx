var React = require('react');

if (typeof window !== "undefined") {
    require('./TopBarComponent.scss');
}

module.exports.component = React.createClass({

    render: function() {

        var RouteTopBar;

        if (this.props.page.name === "admin/routes") {
            RouteTopBar = (
                <div className="TopBarComponent">
                    <div className="title">Vivid CMS</div>
                    <input type="text" placeholder="Search Routes" className="searchbar" onChange={this.onInputChange} value={this.props.component.currentFilter}/>
                </div>
            );
        } else {
            RouteTopBar = (
                <div className="TopBarComponent">
                    <div className="title">Vivid CMS</div>
                </div>
            )
        }

        return RouteTopBar;
    },

    onInputChange: function(e) {
        this.props.dispatch({ type: "FILTER_ROUTES", sendToAllComponentsOnPage: true, filterByString: e.target.value})
    }

});


module.exports.reducer = function(state, action) {

    switch(action.type) {
        case "@@redux/INIT":
            state.currentFilter = "";

            break;
        case "FILTER_ROUTES":
            state.currentFilter = action.filterByString;
    }

    return state;
};


