const expect = require('expect');
const {Users} = require('./../utils/users');

describe('Users', () => {
    let users 

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1', 
            name: 'Semjon',
            room: 'Node'
        }, {
            id: '2', 
            name: 'Stepan',
            room: 'React'
        }, {
            id: '3', 
            name: 'Slava',
            room: 'Node'
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {id: 123, name: 'Ilia', room: 'Hell'};
        let resUSers = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let removedUser = users.removeUser('1');

        expect(removedUser.id).toBe('1');
        expect(users.users).toExclude(removedUser);
    });

    it('should not remove a user', () => {
        let originalUsers = users.users;
        let removedUser = users.removeUser('22');

        expect(removedUser).toNotExist();
        expect(users.users).toEqual(originalUsers);
    });

    it('should find a user', () => {
        let user = users.getUser('1');

        expect(user).toEqual({
            id: '1', 
            name: 'Semjon',
            room: 'Node'
        });
    });

    it('should not find a user', () => {
        let user = users.getUser('33');

        expect(user).toNotExist();    
    });

    it('should return names for Node course', () => {
        let userList = users.getUserList('Node');

        expect(userList).toEqual(['Semjon', 'Slava']);
    });

    it('should return names for React course', () => {
        let userList = users.getUserList('React');

        expect(userList).toEqual(['Stepan']);
    });
});