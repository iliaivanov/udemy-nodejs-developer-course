const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');

// let id = '58f22b36bd02866c3c4c54b0dsads';
//
// if (!ObjectID.isValid(id)) {
//     console.log('Invalid object id', id);
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos); // todos will be array here!
// });
//
// Todo.findOne({
//     _id: id
// }).then((singleTodo) => {
//     console.log('Single todo', singleTodo); // object returned here!
// });

// Todo.findById(id).then((todo) => {
//     if (todo === null) {
//         return console.log('Id not found');
//     }
//
//     console.log('Todo by id', todo);
// }).catch((err) => console.log(err));
