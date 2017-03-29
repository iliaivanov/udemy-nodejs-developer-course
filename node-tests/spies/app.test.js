const expect = require('expect');
const rewire = require('rewire');

let app = rewire('./app');

// Check https://github.com/mjackson/expect

describe('APP', () => {
    let db = {
        saveUser: expect.createSpy()
    };
    app.__set__('db', db);

    it('Should call spy correctly', () => {
        let spy = expect.createSpy();
        spy('Ilia', 1);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith('Ilia', 1);
    });

    it('Should saveUser with user object', () => {
        let email = 'ilia@example.com',
            password = 'foobar';

        app.handleSignup(email, password);
        expect(db.saveUser).toHaveBeenCalledWith({email, password});
    });

});
