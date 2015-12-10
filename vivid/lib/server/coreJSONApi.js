var bodyParser = require('body-parser')
var _ = require('underscore');


module.exports.setupMiddleWare = function() {
    this.express.use(bodyParser.json());
}

module.exports.setupCoreJSONApi = function() {

    var Vivid = this;

    this.express.route("/api/core/routes")
        .get(function(req, res) {

            return res.json(Vivid.routes);

        })
        .post(function(req,res) {

            if (!Vivid.routes[req.body.name]) {
                Vivid.route(req.body);
                return res.json({message: "success"});
            } else {
                return res.status(500).json({"message" : "Route already exists "});
            }

        });

    this.express.get("/api/core/routes/:routeName", function(req, res) {

        if (Vivid.routes[req.params.routeName]) {
            res.json(Vivid.routes[req.params.routeName]);
        } else {
            return res.status(404).json({"message" : "Couldn't find that route. "});
        }

    });

    this.express.post("/api/core/routes/:routeName", function(req, res) {

        if (Vivid.routes[req.params.routeName]) {

            // make sure to remove the old route handlers, then add the new ones.
            Vivid.removelRouteHandlers(Vivid.routes[req.params.routeName]);
            Vivid.route(req.body);

            return res.json(req.body);

        } else {
            return res.status(404).json({"message" : "Couldn't find that route. "});
        }
    });

    this.express.delete("/api/core/routes/:routeName", function(req, res) {

        if (Vivid.routes[req.params.routeName]) {

            Vivid.removelRouteHandlers(Vivid.routes[req.params.routeName]);
            Vivid.routes = _.omit(Vivid.routes, req.params.routeName);

            return res.json({message: "success"})

        } else {
            return res.status(404).json({"message" : "Couldn't find that route. "});
        }
    });


};