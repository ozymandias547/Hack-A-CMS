var React = require('react');
var _ = require('underscore');
var EditableText = require('../../../component/EditableText/EditableText.jsx');

var UrlStation = React.createClass({
    render: function() {

        return (
            <div className="station">
                <div>
                    <strong>Match urls:</strong>
                </div>
                {this.props.route.urls.map(function(url, urlIndex) {

                    return <EditableText value={url.url} onChange={this.onUrlChange} onDelete={this.onUrlDelete} />

                    //return url.isBeingEdited ? (
                    //    <div>
                    //        <input data-index={urlIndex} type="text" defaultValue={url.url} ref={function(input) {
                    //            if (input != null) {
                    //                input.focus();
                    //                input.setSelectionRange(1,input.value.length);
                    //            }
                    //        }} onKeyDown={this.onKeyDown}/>
                    //    </div>
                    //) : (
                    //    <div className="url" onClick={this.onEditUrlClick} key={urlIndex}>
                    //            {url.url}
                    //    </div>
                    //);
                }.bind(this))}
            </div>
        );

    },

    onUrlChange: function(e) {

    },

    onUrlDelete: function(e) {

    }

    //onEditUrlClick: function(e) {
    //    this.props.dispatch({
    //        type: "ROUTE_ITEM_URL_CLICK",
    //        sendToAllComponentsOnPage: true,
    //        componentId: this.props.componentId,
    //        clickedRoute: this.props.route,
    //        clickedUrl: e.currentTarget.innerHTML
    //    });
    //},
    //
    //onKeyDown: function(e) {
    //    if (e.which === 13) {
    //        this.props.dispatch({
    //            type: "ROUTE_ITEM_URL_CONFIRM",
    //            sendToAllComponentsOnPage: true,
    //            componentId: this.props.componentId,
    //            route: this.props.route,
    //            urlIndex: parseInt(e.currentTarget.getAttribute("data-index")),
    //            newUrl : e.currentTarget.value
    //        });
    //    }
    //}

});

function listeners(props, action) {

    EditableText.reducer(props.route.urls, action);

    //action.onAction("ROUTE_ITEM_URL_CLICK", function() {
    //
    //    props.routes.forEach(function(route) {
    //        route.isSelected = false;
    //        route.urls.forEach(function(url) {
    //            url.isBeingEdited = false;
    //        })
    //    });
    //
    //    var clickedRoute = _.findWhere(props.routes, {name: action.clickedRoute.name});
    //    clickedRoute.isSelected = !clickedRoute.isSelected;
    //
    //    _.findWhere(clickedRoute.urls, { url: action.clickedUrl }).isBeingEdited = true;
    //});

    //action.onAction("ROUTE_ITEM_URL_CONFIRM", function() {
    //    props.routes.forEach(function(route) {
    //        route.urls.forEach(function(url) {
    //            url.isBeingEdited = false;
    //        })
    //    });
    //    var route = _.findWhere(props.routes, {name: action.route.name});
    //    route.urls[action.urlIndex].url = action.newUrl;
    //    route.needsToBeSaved = true;
    //});

}

module.exports = UrlStation;
module.exports.listeners = listeners;
