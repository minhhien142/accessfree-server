var mongoose = require('mongoose');
mongoose.connect('mongodb://admin@localhost:27017/mydb', { useMongoClient: true });
mongoose.Promise = global.Promise;

exports.Cat = mongoose.model('Cat', { name: String });
exports.Cookie = mongoose.model('Cookie', {
    url: String,
    cookies: String 
})