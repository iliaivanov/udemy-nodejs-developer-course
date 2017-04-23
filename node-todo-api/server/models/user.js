const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// http://mongoosejs.com/docs/validation.html#custom-validators
// http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate

let UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            // validator: (value) => {
            //     return validator.isEmail(value);
            // },
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required:true
        },
        token: {
            type: String,
            required:true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    let user = this,
        userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

// Arrow functions doesn't bind a this keyword.
UserSchema.methods.generateAuthToken = function () {
    let user = this,
        access = 'auth',
        token = jwt.sign({_id: user._id.toHexString(), access}, 'somesolt').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

// Model mehtod, not instance.
UserSchema.statics.findByToken = function (token) {
    let User = this,
        decoded;

    try {
        decoded = jwt.verify(token, 'somesolt');
    } catch (err) {
        // return new Promise((resolve, reject) => {
        //     reject();
        // });
        // or...
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token, // dot notation for the nested data.
        'tokens.access': 'auth',
    });
};

let User = mongoose.model('User', UserSchema);

module.exports = {User};
