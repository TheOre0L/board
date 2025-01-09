import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDto } from 'src/users/dto/user.dto';
import { User, UserCreationAttrs } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ){}

    async login(dto: UserDto){
        const user = await this.userService.getUserByEmail(dto.email);
        if(!user) {
            throw new HttpException("Неверный адрес электронной почты или пароль!", HttpStatus.BAD_REQUEST)
        }
        const isValidPassword = await bcrypt.compare(dto.password, user.password);
        if(isValidPassword){
            return this.generateJwtToken(user);
        } else {
            throw new HttpException("Неверный адрес электронной почты или пароль!", HttpStatus.BAD_REQUEST)
        }
    }

    async registration(createDto: UserCreationAttrs) {
        const candidate = await this.userService.getUserByEmail(createDto.email);
        if(candidate) {
            throw new HttpException("Пользователь с таким адресом электронной почты уже существует!", HttpStatus.BAD_REQUEST)
        }
        const passHesh = await bcrypt.hash(createDto.password, 9);
        const user = await this.userService.addUser({...createDto, password: passHesh});
        return this.generateJwtToken(user);
    }

    async generateJwtToken(user: User){
        const payload = {email: user.email, id: user.id, name: user.name}
        return {
            token: this.jwtService.sign(payload)
        }
    }

}