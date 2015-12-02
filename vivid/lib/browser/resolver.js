module.exports.resolveData = function(route) {

    // raw data from server based upon the resolve object in routes.

    if (route.url === "/") {
        return {
            meta: {
                title: "Vivid Routes"
            },
            welcomeArticle: "<strong>Welcome to Vivid CMS!</strong>",
            routes: [
                {
                    name: "Blog post 1",
                    text: "WOOOOOT"
                },
                {
                    name: "Blog post 2",
                    text: "WOOOOOT"
                },
                {
                    name: "Blog post 3",
                    text: "WOOOOOT"
                },
                {
                    name: "Blog post 4",
                    text: "WOOOOOT"
                }
            ]
        };
    }


    if (route.url === "/config") {
        return {
            meta: {
                title: "Vivid Configuration"
            },
            configArticle: "<strong>This is config</strong>"
        };
    }

};