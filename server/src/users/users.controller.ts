import { Controller, Get, Post, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('/api')
export class UsersController {

    constructor(private UserService: UsersService){}

    @Get('/users')
    getUsers() {
        return this.UserService.getUsers()
    }
    
    @Get('/user')
    getUser() {
        return this.UserService.getUser()
    }
}
