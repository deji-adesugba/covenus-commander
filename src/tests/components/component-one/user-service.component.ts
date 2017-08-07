import { Component } from '../../../../common';
import { UserNotFoundException } from '../../traps/exceptions';

@Component()
export class UserService{
    private users = [
        { id: 1, name: "Jason Bourne" },
        { id: 2, name: "Jack Sparrow" },
        { id: 3, name: "John Smith" },
    ];

    getAllUsers() {
        return Promise.resolve(this.users);
    }
    getUser(id: string) {
        const user = this.users.find((user) => user.id == +id);
        if (!user) {
            throw new UserNotFoundException();
        }
        return Promise.resolve(user);
    }
    addUser(user) {
        this.users.push(user);
        return Promise.resolve();
    }
}
