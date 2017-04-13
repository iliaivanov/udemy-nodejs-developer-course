const {MongoClient, ObjectID} = require('mongodb'); // Destructuring.

MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log(err);
    }

    console.log('Connected to server');

    // findOneAndUpdate
    db.collection('Todos').findOneAndUpdate({
        _id: new ObjectID('58ebdd326d03a127775fa974')
    }, {
        $set: {
            complited: true
        },
    }, {
        returnOriginal: false // other way will return updated item.
    }).then((result) => {
        console.log(result);
    });

    // db.close();
});
