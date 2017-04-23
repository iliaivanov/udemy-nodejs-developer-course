const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

let data = {
    id: 123
};

let token = jwt.sign(data, 'somesolt');
console.log(token);

let decoded = jwt.verify(token, 'somesolt');
console.log('Decoded', decoded);

// let message = 'I am awesome';
//
// let hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// let data = {
//     id: 4
// };
//
// let token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesolt').toString()
// };
//
// let resultHash = SHA256(JSON.stringify(token.data) + 'somesolt').toString();
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// if (resultHash === token.hash) {
//     console.log('Data not changed.');
// } else {
//     console.log('Data was changed. Do not trust!');
// }
