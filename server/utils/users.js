class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        let user = {
            id, name, room
        };
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);
        if (user) {
            this.users = this.users.filter(user => user.id !== id);
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