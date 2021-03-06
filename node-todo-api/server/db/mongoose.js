let mongoose = require('mongoose');

// http://mongoosejs.com/docs/guide.html
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports.mongoose;
