const {Users} = require('./users');

describe('users functionality', () => {
    var users;
    beforeEach(() => {
        users = new Users();

        users.users = [{
            id: '1',
            name: 'hitalo1',
            room: 'fireds'
        },{
            id: '2',
            name: 'hitalo2',
            room: 'fireds'
        },{
            id: '3',
            name: 'hitalo3',
            room: 'employedS'
        }];
    });

    test('should add new user', () => {
        var user = {
            id: '123',
            name: 'hitalo',
            room: 'fireds'
        };

        var resUser = users.addUser(user.id, user.name, user.room);
        
        expect(users.users.length).toBe(4);
        expect(resUser.id).toBe('123');
        expect(resUser.name).toBe('hitalo');
        expect(resUser.room).toBe('fireds');

    });

    test('should return names for firedS room', () => {
        userList = users.getUserList('fireds');
        
        expect(userList.length).toBe(2);
    });

    test('should return user by id', () => {
        var userId = '2';
        var user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    test('should not return user by id', () => {
        var userId = '10';
        var user = users.getUser(userId);

        expect(user).toBeUndefined();
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
    
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });
    
      it('should not remove user', () => {
        var userId = '99';
        var user = users.removeUser(userId);
    
        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });

});