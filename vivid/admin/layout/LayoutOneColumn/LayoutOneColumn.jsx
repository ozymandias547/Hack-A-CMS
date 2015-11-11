var React = require('react');

module.exports = function(pageData, content) {
    return (

    <html>
        <head>
            <title>{pageData.meta.title}</title>
        </head>
        <body>{content}</body>
    </html>

    );
};
