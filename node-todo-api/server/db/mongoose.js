let mongoose = require('mongoose');

// http://mongoosejs.com/docs/guide.html
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1:27017/TodoApp');

module.exports.mongoose;
