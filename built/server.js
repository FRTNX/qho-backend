var { config } = require('./../config/config');
var app = require('./express');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
// comment out listener to get verbose error
mongoose.connection.on('error', function () {
    throw new Error("Unable to connect to database: " + config.mongoUri);
});
app.listen(config.port, function (error) {
    if (error) {
        console.log(error);
    }
    else {
        console.log("Server running on http://localhost:" + config.port + "/");
    }
});
