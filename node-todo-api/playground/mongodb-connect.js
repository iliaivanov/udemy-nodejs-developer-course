// Destructuring - ES6 feature.
// let user = {name: "Ilia", age: 25};
// let {name} = user;
// console.log(name);

// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // Destructuring.

// Generating object ids.
// let obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log(err);
    }

    console.log('Connected to server');

    // db.collection('Todos').insertOne({
    //     text: 'Do something',
    //     complited: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo.');
    //     }
    //
    //     console.log(JSON.stringify(result.ops));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Ilia',
    //     age: 30
    // }, (err, result) => {
    //     if (err) {
    //         return console.log(err);
    //     }
    //
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    db.close();
});
