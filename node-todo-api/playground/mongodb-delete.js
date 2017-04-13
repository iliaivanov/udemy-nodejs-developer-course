const {MongoClient, ObjectID} = require('mongodb'); // Destructuring.

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log(err);
    }

    console.log('Connected to server');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Sleep'}).then((result) => {
    //     console.log(result.result);
    // });

    // deleteOne
    // db.collection('Todos').deleteOne({text: 'Do something'}).then((result) => {
    //     console.log(result.result);
    // });

    // findOneAndDelete - returns deleted item
    // db.collection('Todos').findOneAndDelete({complited: false}).then((result) => {
    //     console.log(result.value);
    // });

    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('58de6e5e056dde258b77ffd6')
    }).then((result) => {
        console.log(result.value);
    });

    // db.close();
});
