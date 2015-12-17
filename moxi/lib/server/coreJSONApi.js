var bodyParser = require('body-parser')
var _ = require('underscore');


module.exports.setupMiddleWare = function() {
    this.express.use(bodyParser.json());
}

module.exports.setupCoreJSONApi = function() {

    this.express.route("/api/core/routes")
        .get(function(req, res) {

            return res.json(this.routes);

        }.bind(this))
        .post(function(req,res) {

            if (!this.routes[req.body.name] && req.body) {
                this.route(req.body);
                return res.json(this.routes[req.body.name]);
            } else {
                return res.status(500).json({"message" : "Route already exists "});
            }

        }.bind(this));

    this.express.get("/api/core/routes/:routeName", function(req, res) {

        if (this.routes[req.params.routeName]) {
            res.json(this.routes[req.params.routeName]);
        } else {
            return res.status(404).json({"message" : "Couldn't find that route. "});
        }

    }.bind(this));

    this.express.post("/api/core/routes/:routeName", function(req, res) {

        if (this.routes[req.params.routeName]) {

            // make sure to remove the old route handlers, then add the new ones.
            this.removelRouteHandlers(this.routes[req.params.routeName]);
            this.route(req.body);

            return res.json(req.body);

        } else {
            return res.status(404).json({"message" : "Couldn't find that route. "});
        }
    }.bind(this));

    this.express.delete("/api/core/routes/:routeName", function(req, res) {

        if (this.routes[req.params.routeName]) {

            this.removelRouteHandlers(this.routes[req.params.routeName]);
            this.routes = _.omit(this.routes, req.params.routeName);

            return res.json({message: "success"})

        } else {
            return res.status(404).json({"message" : "Couldn't find that route. "});
        }
    }.bind(this));


};