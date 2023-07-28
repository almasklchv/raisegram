import { Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { UserDto } from './dto';

@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async createUser(@Query() dto: UserDto) {
    return this.userService.create(dto);
  }

  @Post('/get')
  async getUser(@Query() dto: UserDto, @Res() res: Response) {
    const user = await this.userService.checkPassword(dto);
    if (user) {
      res.status(200).json(user);
      
    } else {
      res.status(401).json('Credentials incorrect');
    }
  }

  @Post('/check')
  async checkUserExist(@Query() dto: UserDto) {
    const isUserExist = await this.userService.checkUserExist(dto);
    return isUserExist;
  }
}
