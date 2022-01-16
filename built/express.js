var express = require('express');
var { config } = require('./../config/config');
var userRoutes = require('./routes/user.routes');
var palyRoutes = require('./routes/play.routes');
var app = express();
console.log(config)
// app.use(express.json({ limit: config.request.limit }));
app.use(express.urlencoded());
app.use('/', userRoutes);
// default route
app.use('/', function (request, response) {
    return response.status(200).json({
        message: 'By the pricking of my thumbs, Somthing wicked this way comes.'
    });
});
module.exports = app;
