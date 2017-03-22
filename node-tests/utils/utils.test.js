const utils = require('./utils');

it('should add two numbers', () => {
    var result = utils.add(1, 9);

    if (result != 10) {
        throw new Error(`Expected 10, but got ${result}`);
    }
});

it('should sqare a number', () => {
    var result = utils.square(5);

    if (result != 25) {
        throw new Error(`Expected 25, but got ${result}`);
    }
});
