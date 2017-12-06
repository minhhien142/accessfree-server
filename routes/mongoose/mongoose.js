var mongoose = require('mongoose');
// mongoose.connect('mongodb://admin@accessfree.tk:27017/mydbs', { useMongoClient: true });
mongoose.connect('mongodb://admin:admin@ds129906.mlab.com:29906/accessfree', { useMongoClient: true });
mongoose.Promise = global.Promise;

exports.Cat = mongoose.model('Cat', { name: String });
exports.Cookie = mongoose.model('Cookie', {
    url: String,
    cookies: String,
    date: { type: Date, default: Date.now } 
})
