var mongoose = require('mongoose'),
    crypto = require('crypto');
module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error..'));
    db.once('open', function callback() {
        console.log('mean db is opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        secondName: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]

    });
    userSchema.methods = {
        'authenticate': function (passwordToMatch) {
            return (createHashPwd(this.salt, passwordToMatch) === this.hashed_pwd);
        }
    };
    var User = mongoose.model('User', userSchema);
    User.find({}).exec(function (err, collection) {
        if (collection.length == 0) {
            var salt, hash;
            salt = createSalt();
            hash = createHashPwd(salt, 'admin');
            User.create({
                firstName: 'Valery',
                secondName: 'Losik',
                username: 'ValeryLosik',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
            });
            salt = createSalt();
            hash = createHashPwd(salt, 'smith');
            User.create({
                firstName: 'John',
                secondName: 'Smith',
                username: 'Smith',
                salt: salt,
                hashed_pwd: hash
            });
        }
    });
}
function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}
function createHashPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}