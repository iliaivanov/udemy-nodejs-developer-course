const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let password = 'qwerty123!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     });
// });

let hashedPassword = '$2a$10$kaQUdZGupisqDeW1H0tVr.yinGUb8FD7fjv0YP359TPhIKpfrt73K';

bcrypt.compare(password, hashedPassword, (err, result) => {
    if (result) {
        console.log('OK');
    } else {
        console.log('nope');
    }
});

// let data = {
//     id: 123
// };
//
// let token = jwt.sign(data, 'somesolt');
// console.log(token);
//
// let decoded = jwt.verify(token, 'somesolt');
// console.log('Decoded', decoded);

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
