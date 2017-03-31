const MongoClient = require('mongodb').MongoClient;

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

    db.collection('Users').insertOne({
        name: 'Ilia',
        age: 30
    }, (err, result) => {
        if (err) {
            return console.log(err);
        }

        console.log(JSON.stringify(result.ops));
    });

    db.close();
});
