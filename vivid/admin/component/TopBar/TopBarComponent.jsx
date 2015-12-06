var React = require('react');

if (typeof window !== "undefined") {
    require('./TopBarComponent.scss');
}

module.exports.component = function(Vivid) {

    var TopBarComponent = React.createClass({

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
        },
        componentDidMount: function() {
            document.querySelector(".AdminNavComponent").style.height = window.innerHeight - document.querySelector(".AdminNavComponent").getClientRects()[0].top
        }

    });

    return TopBarComponent;

};

module.exports.reducer = function(Vivid) {

    return function(state, action) {

        switch(action.type) {
            case "@@redux/INIT":
                state.currentFilter = "";

                break;
            case "FILTER_ROUTES":
                state.currentFilter = action.filterByString;
        }

        return state;
    };

};
