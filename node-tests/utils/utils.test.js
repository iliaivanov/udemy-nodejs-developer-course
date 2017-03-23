const utils = require('./utils');
const expect = require('expect');

describe('Utils', () => {
    // #add (#METHOD_NAME) is the common thing to describe group for method.
    describe('#add', () => {
        it('should add two numbers', () => {
            var result = utils.add(1, 9);

            expect(result).toBe(10, `Expected 10, but got ${result}`).toBeA('number');
        });

        // If use usual 'it' callback arrow functions test will always pass in case of
        // async function call with callback. This is happening because mocha is not
        // even waiting until asyncAdd callback will be called and assertion executed.
        // To prevent it need to use _done_ as an arrow func. argument.
        it('should async add two numbers', (done) => {
            utils.asyncAdd(4, 5, (sum) => {
                expect(sum).toBe(9).toBeA('number');
                done();
            });
        });
    });

    describe('#square', () => {
        it('should sqare a number', () => {
            var result = utils.square(5);

            expect(result).toBe(25, `Expected 25, but got ${result}`).toBeA('number');
        });

        it('should async sqare a number', (done) => {
            utils.asyncSquare(11, (res) => {
                expect(res).toBe(121).toBeA('number');
                done();
            });
        });
    });
});

describe('Playground', () => {
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
});
