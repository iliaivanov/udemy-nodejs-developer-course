const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// Todo.remove({}) - everything will be removed

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

// Todo.findOneAndRemove();
// Todo.findByIdAndRemove();

// Todo.findByIdAndRemove('58fb6ac79df361dc199bc79e').then((removedTodo) => {
//     console.log(removedTodo);
// });

// Todo.findOneAndRemove({text: "somehting to search for"}).then((removedTodo) => {
//
// });
