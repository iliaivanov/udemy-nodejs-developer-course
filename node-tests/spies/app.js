let = require('./db');

module.exports.handleSignup = (email, password) => {
    // Check email exists.
    db.saveUser({email, password});
    // Send email.
};
