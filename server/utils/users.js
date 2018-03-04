class Users {
    constructor() {
        this.users = [];
        this.rooms = [];
    }

    addUser(id, name, room) {
        let user = {
            id, name, room
        };
        this.users.push(user);
        if (this.rooms.indexOf(room) === -1) {
            this.rooms.push(room);
        }
        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(user => user.id !== id);
            if (this.getUserList(user.room).length ===  0) {
                this.rooms = this.rooms.filter(room => room !== user.room);
            }
        }
        return user;
    }

    getUser(id) {
        return this.users.filter(user => user.id === id)[0];
    }

    getUserList(room) {
        return this.users
            .filter(user => user.room === room)
            .map(user => user.name);
    }

    isUserExists(name, room) {
        return this.users.filter(user => (
            user.name.toUpperCase() === name.toUpperCase()
            && user.room.toUpperCase() === room.toUpperCase()
        )).length > 0;
    }
}

module.exports = { Users };
// class Person {
//     constructor(name, age) {
//         this.name= name;
//         this.age = age;
//     }

//     // toString() {
//     //     return `name: ${this.name}, age: ${this.age}`;
//     // }
// }

// let me = new Person('Zhu', 12);
// console.log(me);