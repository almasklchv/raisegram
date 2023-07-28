import { Injectable } from '@nestjs/common';
import { UserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: UserDto) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(dto.hash, saltRounds);

      const user = {
        email: dto.email,
        hash: hashedPassword,
      };

      console.log(user);
      return this.prisma.user.create({
        data: user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async checkUserExist(dto: UserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (user) {
        return true;
      }
      
      return false;
    } catch (error) {}
  }

  async checkPassword(dto: UserDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (user) {
        const passwordMatch = await bcrypt.compare(dto.hash, user.hash);
        if (passwordMatch) {
          return user;
        }
      }

      return null;
    } catch (error) {
      console.error(error);
    }
  }
}
