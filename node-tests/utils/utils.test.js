const utils = require('./utils');
const expect = require('expect');

it('should add two numbers', () => {
    var result = utils.add(1, 9);

    expect(result).toBe(10, `Expected 10, but got ${result}`).toBeA('number');
});

it('should sqare a number', () => {
    var result = utils.square(5);

    expect(result).toBe(25, `Expected 25, but got ${result}`).toBeA('number');
});

it('set first and last names', () => {
    var user = {
        location: 'ee',
        age: 30
    };

    var updatedUser = utils.setName(user, 'Ilia Ivanov');

    expect(updatedUser).toInclude({
        firstName: 'Ilia',
        lastName: 'Ivanov'
    });
});

// Playing around.
// it('should expect some stuff', () => {
//     expect(12).toNotBe(13); // Not working with objects.
//     expect({name: 'Ilia'}).toNotEqual({name: 'Ilia'});
//     expect({name: 'Ilia'}).toEqual({name: 'Ilia'});
//     expect([1, 3, 5]).toInclude(1);
//     expect([1, 3, 5]).toExclude(2);
//     expect({
//         name: 'ilia',
//         age: 30
//     }).toInclude({
//         age: 30
//     });
//     expect({
//         name: 'ilia',
//         age: 30
//     }).toExclude({
//         age: 31
//     });
// });
