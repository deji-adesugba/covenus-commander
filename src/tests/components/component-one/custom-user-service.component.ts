import { Component } from '../../../../common';
import { UserNotFoundException } from '../../traps/exceptions';

@Component()
export class CustomUserService{
    getAllUsers() {
        return Promise.resolve([]);
    }
    getUser(id: string) {
        if(id == 'XXX'){
            return Promise.resolve({ id: 99, name: "Super User - Vin Diesel" });
        }
        throw new UserNotFoundException();
    }
    addUser(user) {
        return Promise.resolve();
    }
}
