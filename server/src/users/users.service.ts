import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User, UserCreationAttrs } from './users.model';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User){}

    async addUser(dto: UserCreationAttrs) {
        const candidate = await this.userRepository.create(dto);
        return candidate;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}});
        return user;
    }

    async getUsers() {
        return {user: "user", email: "email@gmail.com"};
    }

    async getUser() {
        return {user: "user1", email: "email@gmail.com"};
    }
}
