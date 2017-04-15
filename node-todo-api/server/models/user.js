let mongoose = require('mongoose');

let User = mongoose.model('User', {
    email: {
        type: String,
        require: true,
        minlength: 1,
        trim: true
    }
});

// let newUser = new User({email: 'kokoko@mail.ru'});
//
// newUser.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//     console.log('Unable to save user', err);
// });

module.exports = {User};
