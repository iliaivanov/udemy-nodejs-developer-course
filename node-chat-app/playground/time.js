const moment = require('moment');

// http://momentjs.com/docs/
let date = moment();
// date.add(1, 'years').subtract(9, 'months');
console.log(date.format('H:mm'));