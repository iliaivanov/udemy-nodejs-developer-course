var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguments must be numbers.');
            }
        }, 1500);
    });
}

asyncAdd(1, 2).then((result) => {
    console.log(`Result: ${result}`);
    return asyncAdd(result, 33);
}).then((result) => {
    console.log(`Should be: ${result}`);
}).catch((errorMessage) => { // Catch works for all rejects!
    console.log(errorMessage);
});

console.log('Hmmmm');

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         // resolve('hey!');
//         reject('Unable to fulfill promise.');
//     }, 2500);
// });
//
// somePromise.then((message) => {
//     console.log('Success: ', message);
// }, (error) => {
//     console.log('Error: ', error);
// });
