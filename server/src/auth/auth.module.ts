import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import {JwtModule} from "@nestjs/jwt"
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      UsersModule,
      SequelizeModule.forFeature([User]),
      JwtModule.register({
        secret: "SECRET",
        signOptions: {
          expiresIn: "24h"
        }
      })
    ]
})
export class AuthModule {}
