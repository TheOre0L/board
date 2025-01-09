import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UserCreationAttrs } from 'src/users/users.model';

@Controller('/api/1.0/auth')
export class AuthController {
    constructor (private authService: AuthService){}

    @Post("/login")
    login (@Body() dto: UserDto) {
        return this.authService.login(dto)
    }

    @Post("/registration")
    registration (@Body() createDto: UserCreationAttrs) {
         return this.authService.registration(createDto)
    }
}
