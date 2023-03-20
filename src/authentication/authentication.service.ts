import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUND } from '../config';
import { User } from '@prisma/client';

@Injectable()
export class AuthenticationService {
  constructor(private prisma: PrismaService) {}

  async createUser(username: string, password: string): Promise<void> {
    const hashedPassword = bcrypt.hashSync(password, BCRYPT_SALT_ROUND);
    await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  }

  async checkUsernamePassword(
    username: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        username,
      },
    });

    return (await bcrypt.compare(password, user?.password || '')) ? user : null;
  }
}
