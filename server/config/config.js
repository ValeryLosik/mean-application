var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        db: 'mongodb://localhost/mean',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://v.losik:mean@ds037907.mongolab.com:37907/mean',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    }
};