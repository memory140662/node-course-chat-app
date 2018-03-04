const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {

    let users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Zhu',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Chu',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Mo',
            room: 'Node Course'
        }];
    });

    it('should add new user', () => {
        let users = new Users();
        let user = {
            id: '123',
            name: 'Zhu',
            room: 'The Office Fans'
        };
        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        let userId = '1';
        let user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('shoud not remove a user', () => {
        let userId = '21';
        let user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it('should find a user', () => {
        let userId = '1';
        let user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find a user', () => {
        let userId = '44';
        let user = users.getUser(userId);
        expect(user).toNotExist();
    })

    it('should return names for node course', () => {
        let userList = users.getUserList('React Course');
        expect(userList).toEqual(['Chu']);
    });
});