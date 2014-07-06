var express = require('express'),
    stylus = require('stylus'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var winston = require('winston');


//function for compiling jade layouts
function compile(str, path) {
    return stylus(str).set('filename', path);
}

//Creating an object of an app
var app = express();

//Confinguring an app without deprecated method configure
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');


//app.use(express.logger('dev'));
// parse application/json

// parse application/vnd.api+json as json
//middleware of stylus
app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
}));

app.use(express.static(__dirname + '/public'));
if(env=='development')
    mongoose.connect('mongodb://localhost/mean');
else
mongoose.connect('mongodb://v.losik:mean@ds037907.mongolab.com:37907/mean');
var db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error..'));
db.once('open', function callback() {
    console.log('mean db is opened');
});
var messageSchema = mongoose.Schema({
    message: String

});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function (err, messageDoc) {
    mongoMessage = messageDoc.message;

});
app.get('/partials/:partialPath', function (req, res) {
    res.render('partials/' + req.params.partialPath);
});


app.get('*', function (req, res) {
    res.render('index', {
        'mongoMessage': mongoMessage
    });
});


var port = process.env.PORT || 3030;
app.listen(port);

console.log('Server is running at the port ' + port + '...');