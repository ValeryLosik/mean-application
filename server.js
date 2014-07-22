var express = require('express'),
    mongoose=require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./server/config/config')[env];

//Creating an object of an app
var app = express();
require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

app.listen(config.port);
console.log('Server is running at the port ' + config.port + '...');
