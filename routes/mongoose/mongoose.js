var mongoose = require('mongoose');
mongoose.connect('mongodb://admin@accessfree.tk:27017/mydbs', { useMongoClient: true });
mongoose.Promise = global.Promise;

exports.Cat = mongoose.model('Cat', { name: String });
exports.Cookie = mongoose.model('Cookie', {
    url: String,
    cookies: String 
})