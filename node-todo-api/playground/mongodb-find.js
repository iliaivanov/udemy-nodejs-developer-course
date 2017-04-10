const {MongoClient, ObjectID} = require('mongodb'); // Destructuring.

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log(err);
    }

    console.log('Connected to server');

    // db.collection('Todos').find({
    //     _id: new ObjectID('58de6de0c4dc0d255b3e7111') // Need to create ObjectID object in order to search for object ID.
    // }).toArray().then((docs) => {
    //     console.log('Todos: ');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
    // }, (err) => {
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name: 'Ilia'}).toArray().then((users) => {
        console.log('Users: ');
        console.log(JSON.stringify(users, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch users', err);
    });

    // db.close();
});
