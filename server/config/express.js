var express = require('express'),
    stylus = require('stylus'),
    winston = require('winston'),
    cookieParser = require('cookie-parser'),
    bodyParser=require('body-parser'),
    passport = require('passport'),
    session = require('express-session');

module.exports = function (app, config) {

    //function for compiling jade layouts
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({secret: 'MEAN Stack',
        saveUninitialized: true,
        resave: true}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: compile
    }));

    app.use(express.static(config.rootPath + '/public'));
};