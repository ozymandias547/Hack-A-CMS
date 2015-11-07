var debug = require('debug')('vivid:core:init');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

function start() {

    debug('Vivid CMS App start sequence.');

    var _this = this;

    this._express.get("/", function(req, res) {
        res.send(ReactDOMServer.renderToStaticMarkup(React.createElement(_this.components["HelloComponent"], { name: "Vivid CMS" })));
    });

    this._express.listen(this.port, function () {
        console.log('Vivid App listening on port %d.', _this.port);
    });

}

module.exports = start;