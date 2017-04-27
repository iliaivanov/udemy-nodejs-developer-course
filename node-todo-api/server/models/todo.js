let mongoose = require('mongoose');

let Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    complited: {
        type: Boolean,
        default: false
    },
    complitedAt: {
        type: Number,
        default: null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

// let newTodo = new Todo({
//     text: 'Return to Tallinn',
//     complited: false
// });
//
// newTodo.save().then((doc) => {
//     console.log('Saved todo', doc);
// }, (e) => {
//     console.log('Unable to save todo');
// });

// let otherTodo = new Todo({
//     text: '    fly to space   '
// });
//
// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
// }, (err) => {
//     console.log('Unable to save todo', err);
// });


module.exports = {Todo};
